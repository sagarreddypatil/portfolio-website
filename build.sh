#!/bin/bash

set -m

fail() {
    echo "Build failed"
    exit 1
}

tw() {
    echo "Building Tailwind CSS to dist/index.css"
    find . | grep \.bin
    ./node_modules/.bin/tailwindcss -i ./src/index.css -o ./dist/index.css --minify || fail
}

html() {
    echo "Building HTML files to dist"
    poetry run python src/build.py --output dist --no-clean || fail
}

static() {
    for ent in public/*; do
        echo "Copying $ent to dist/${ent##*/}"
        cp -r $ent dist/${ent##*/} || fail
    done
}

opt_imgs() {
    ./src/optimize-images.sh || fail
}

my_wait() {
    local failed=0
    local pids=("$@")

    # If no PIDs are provided, get all background job PIDs
    if [ ${#pids[@]} -eq 0 ]; then
        pids=($(jobs -p))
    fi

    for pid in "${pids[@]}"; do
        wait "$pid"
        if [ $? -ne 0 ]; then
            failed=1
        fi
    done

    if [ $failed -eq 1 ]; then
        fail
    fi
}

html_static() {
    html &
    hpid=$!

    static &
    spid=$!

    my_wait $hpid $spid

    opt_imgs &
}

rm -rf dist && mkdir dist

tw &
html_static &

my_wait
