// Suggests page URLs after `](/` or `href="/`, and underlines internal links
// that don't go to any page. Pages are found by their `permalink:` front matter.
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---/;
const LINK = /\]\(([^)\s]+)[^)]*\)|href=["']([^"']+)["']/g;
const SKIP = '{**/_*/**,**/.*/**,**/node_modules/**,**/vendor/**}';

let pages = new Map(); // url -> { title, file }
let diagnostics;

function frontMatter(text) {
  const m = FRONT_MATTER.exec(text);
  if (!m) return {};
  const get = key => {
    const r = new RegExp('^' + key + ':\\s*(.+)$', 'm').exec(m[1]);
    return r ? r[1].trim().replace(/^["']|["']$/g, '') : undefined;
  };
  return { permalink: get('permalink'), title: get('title') };
}

function normalise(url) {
  url = url.split('#')[0].split('?')[0];
  if (url.endsWith('.html')) url = url.slice(0, -5);
  if (url.endsWith('/index')) url = url.slice(0, -5);
  return url.endsWith('/') ? url : url + '/';
}

function root() {
  const folder = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0];
  return folder ? folder.uri.fsPath : undefined;
}

async function scan() {
  const found = new Map();
  const files = await vscode.workspace.findFiles('**/*.{md,html}', SKIP);
  for (const uri of files) {
    let text;
    try { text = fs.readFileSync(uri.fsPath, 'utf8'); } catch { continue; }
    const fm = frontMatter(text);
    const rel = path.relative(root(), uri.fsPath).split(path.sep).join('/');
    let url = fm.permalink;
    if (!url && rel.endsWith('.html')) url = '/' + rel;
    if (!url) continue;
    found.set(normalise(url), { title: fm.title || rel, file: rel });
  }
  pages = found;
  vscode.workspace.textDocuments.forEach(check);
}

// A link is fine if a page has that permalink, or a real file sits at that path.
function exists(url) {
  if (pages.has(normalise(url))) return true;
  const clean = decodeURIComponent(url.split('#')[0].split('?')[0]);
  const onDisk = path.join(root(), clean);
  return fs.existsSync(onDisk) && (!fs.statSync(onDisk).isDirectory() || fs.existsSync(path.join(onDisk, 'index.html')));
}

function check(doc) {
  // Only markdown: html pages carry scripts whose strings look like links.
  if (doc.languageId !== 'markdown' || !root()) return;
  const text = doc.getText();
  const own = frontMatter(text).permalink;
  const found = [];
  for (const m of text.matchAll(LINK)) {
    const target = m[1] || m[2];
    if (/^([a-z]+:|#|\{)/i.test(target)) continue;
    const absolute = target.startsWith('/');
    if (!absolute && !own) continue;
    const url = absolute ? target : new URL(target, 'http://x' + normalise(own)).pathname;
    const start = doc.positionAt(m.index + m[0].indexOf(target));
    const range = new vscode.Range(start, start.translate(0, target.length));
    if (!exists(url)) {
      found.push(new vscode.Diagnostic(range, `no page at ${url}`, vscode.DiagnosticSeverity.Error));
    } else if (absolute && !path.extname(target.split('#')[0]) && !target.split('#')[0].endsWith('/')) {
      found.push(new vscode.Diagnostic(range, 'missing trailing slash', vscode.DiagnosticSeverity.Warning));
    }
  }
  diagnostics.set(doc.uri, found);
}

const completions = {
  provideCompletionItems(doc, pos) {
    const before = doc.lineAt(pos).text.slice(0, pos.character);
    const m = /(?:\]\(|href=["'])(\/[^)\s"']*)$/.exec(before);
    if (!m) return;
    const range = new vscode.Range(pos.translate(0, -m[1].length), pos);
    return [...pages].map(([url, page]) => {
      const item = new vscode.CompletionItem(url, vscode.CompletionItemKind.File);
      item.detail = page.title;
      item.documentation = page.file;
      item.range = range;
      return item;
    });
  },
};

function activate(context) {
  diagnostics = vscode.languages.createDiagnosticCollection('permalinks');
  let timer;
  const rescan = () => { clearTimeout(timer); timer = setTimeout(scan, 300); };
  const watcher = vscode.workspace.createFileSystemWatcher('**/*.{md,html}');
  context.subscriptions.push(
    diagnostics,
    watcher,
    watcher.onDidCreate(rescan),
    watcher.onDidDelete(rescan),
    vscode.workspace.onDidSaveTextDocument(rescan),
    vscode.workspace.onDidOpenTextDocument(check),
    vscode.workspace.onDidChangeTextDocument(e => check(e.document)),
    vscode.workspace.onDidCloseTextDocument(doc => diagnostics.delete(doc.uri)),
    vscode.languages.registerCompletionItemProvider(['markdown', 'html'], completions, '/'),
  );
  scan();
}

module.exports = { activate };
