# Portfolio Website

My portfolio website, built with a custom static site generator

## Dependencies
```sh
yarn install
poetry install
```

## Development
```sh
poetry shell
yarn dev
```

## Production
```sh
yarn build
```

## Map
```
portfolio-website
├── README.md                     # this file
├── dist                          # output directory
├── LICENSE                       # MIT License
├── package.json                  # JS dependencies & dev server target
├── yarn.lock
├── tailwind.config.js
├── pyproject.toml                # Python dependencies
├── poetry.lock
├── build.sh                      # prod build script, called by yarn build
├── posts                         # contains categories of posts
│   └── projects
│       └── *.md                  # project posts
├── public
│   ├── assets/                   # static assets, images optimized
│   └── photography/              # unoptimized images
├── src
│   ├── build.py                  # main entrypoint
│   ├── dev-server.py             # live reload server
│   ├── index.css                 # just tailwind imports
│   ├── optimize-images.sh        # image optimization script
│   └── templates
│       ├── components            # reusable components
│       │   ├── button.html
│       │   └── fieldset.html
│       ├── index.html            # landing page
│       ├── layout.html           # base layout
│       └── posts                 # corresponds to posts directory
│           └── projects
│               ├── list.html     # renders list of posts in index.html
│               └── page.html     # renders the actual post page
```