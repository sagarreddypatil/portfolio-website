#!/usr/bin/env sh

tw() {
    ./node_modules/.bin/tailwindcss -i ./src/index.css -o ./dist/index.css --minify
}

html() {
    python src/build.py --output dist --no-clean
}

static() {
    cp -r public/* dist/
}

opt_imgs() {
    ./src/optimize-images.sh
}

html_static() {
    html &
    hpid=$!

    static &
    spid=$!

    wait $hpid $spid
    opt_imgs &
}

tw &
html_static &

wait