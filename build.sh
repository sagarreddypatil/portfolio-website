#!/bin/sh

tw() {
    echo "Building Tailwind CSS to dist/index.css"
    ./node_modules/.bin/tailwindcss -i ./src/index.css -o ./dist/index.css --minify
}

html() {
    echo "Building HTML files to dist"
    python src/build.py --output dist --no-clean
}

static() {
    for ent in public/*; do
        echo "Copying $ent to dist/${ent##*/}"
        cp -r $ent dist/${ent##*/}
    done
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

rm -rf dist && mkdir dist

tw &
html_static &

wait