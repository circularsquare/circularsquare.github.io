"""Download every Spotify liked song to a JSON file.

Uses the PKCE login flow, so only the app's Client ID is needed (no secret).
The Spotify app must list http://127.0.0.1:8888/callback as a redirect URI.

    python scripts/fetch_liked_songs.py <client-id> [output.json]

A browser tab opens to log in; the token is used once and never saved.
"""

import base64
import hashlib
import http.server
import json
import secrets
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
from pathlib import Path

REDIRECT_URI = "http://127.0.0.1:8888/callback"
SCOPE = "user-library-read"
DEFAULT_OUT = Path(__file__).resolve().parent.parent / "music" / "liked_songs.json"


def get_auth_code(client_id, challenge, state):
    params = urllib.parse.urlencode({
        "client_id": client_id,
        "response_type": "code",
        "redirect_uri": REDIRECT_URI,
        "scope": SCOPE,
        "state": state,
        "code_challenge_method": "S256",
        "code_challenge": challenge,
    })
    result = {}

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            result.update({k: v[0] for k, v in query.items()})
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write(b"Done, you can close this tab.")

        def log_message(self, *args):
            pass

    server = http.server.HTTPServer(("127.0.0.1", 8888), Handler)
    print("Opening browser to log in to Spotify...")
    webbrowser.open("https://accounts.spotify.com/authorize?" + params)
    while "code" not in result and "error" not in result:
        server.handle_request()
    server.server_close()

    if "error" in result:
        sys.exit(f"Login failed: {result['error']}")
    if result.get("state") != state:
        sys.exit("Login failed: state mismatch")
    return result["code"]


def get_token(client_id, code, verifier):
    body = urllib.parse.urlencode({
        "client_id": client_id,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "code_verifier": verifier,
    }).encode()
    req = urllib.request.Request("https://accounts.spotify.com/api/token", data=body)
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)["access_token"]


def api_get(url, token):
    while True:
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
        try:
            with urllib.request.urlopen(req) as resp:
                return json.load(resp)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(int(e.headers.get("Retry-After", "5")) + 1)
                continue
            sys.exit(f"Spotify API error {e.code} on {url}: {e.read().decode(errors='replace')}")


def slim(item):
    track = item["track"]
    album = track["album"]
    images = album.get("images") or []
    return {
        "added_at": item["added_at"],
        "id": track["id"],
        "name": track["name"],
        "duration_ms": track["duration_ms"],
        "artists": [{"id": a["id"], "name": a["name"]} for a in track["artists"]],
        "album": {
            "id": album["id"],
            "name": album["name"],
            "release_date": album.get("release_date"),
            # Spotify lists images largest first; the middle one is ~300px.
            "image": images[len(images) // 2]["url"] if images else None,
        },
    }


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    client_id = sys.argv[1]
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUT

    verifier = secrets.token_urlsafe(64)
    challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b"=").decode()
    code = get_auth_code(client_id, challenge, secrets.token_urlsafe(16))
    token = get_token(client_id, code, verifier)

    songs = []
    url = "https://api.spotify.com/v1/me/tracks?limit=50"
    while url:
        page = api_get(url, token)
        songs.extend(slim(item) for item in page["items"] if item.get("track"))
        print(f"  {len(songs)} / {page['total']}")
        url = page["next"]

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(songs, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Wrote {len(songs)} songs to {out}")


if __name__ == "__main__":
    main()
