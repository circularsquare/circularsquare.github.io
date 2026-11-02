# anita.garden

Jekyll site (GitHub Pages, behind Cloudflare). Build locally with
`bundle exec jekyll build --config _config.yml,_config_dev.yml` and serve `_site`
on port 4000 (the leaderboard and kitchen servers only allow localhost:4000).

## The cooking game

Plants on pages, a pot and a shared table on the home page: everything about it
(files, how to add a food, how to check your work, what to keep true) is in
`cooking/README.md`. Read that before touching `_data/kitchen.yml`,
`assets/cooking/`, `_includes/kitchen.html`, `_includes/plant.html`,
`_includes/station.html` or the bunny code in `_includes/cursor.html`.
