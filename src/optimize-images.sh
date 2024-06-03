#/bin/sh

# convert all images to webp
# find and replace image urls in html files

imgs=$(find ./dist -type f -name '*.jpg' -o -name '*.JPG' -o -name '*.jpeg' -o -name '*.JPEG' -o -name '*.png' -o -name '*.PNG' -o -name '*.gif' -o -name '*.GIF')
basenames=$(echo $imgs | xargs -n1 basename)

# convert images to webp
for img in $imgs; do
    anon() {
        echo "Converting $img to $img.webp"
        cwebp -q 80 $img -o $img.webp -quiet
        rm $img
    }

    anon &
done

# replace image urls in html files
htmls=$(find ./dist -type f -name '*.html')

for html in $htmls; do
    anon() {
        for img in $basenames; do
            sed -i "s/$img/$img.webp/g" $html
        done
    }

    anon &
done

wait