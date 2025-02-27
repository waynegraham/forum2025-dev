# forum2025.diglib.org 🌬️

This is the DLF Forum 2025 website.

## How to use
1. [Clone this repository](https://github.com/clirdlf/forum2025.diglib.org.git)
2. Install dependencies: `npm install`
3. Start development: `npm start`
4. See your website at http://localhost:8080/
5. To build the release version: `npm run build`
6. When ready, push to GitHub and the action will build and publish your site to [GitHub Pages](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages)


## Resizing Images


<https://www.roberthorvick.com/blog/converting-images-from-png-jpg-to-webp-and-resizing>

    cwebp infile.png -o outfile.webp

Run resize script:

```bash
    ./resize_images.sh
```


Hero Images

```bash
cd src/static
magick convert src/static/boston-public-library-y0OWfnOGnzo-unsplash.jpg 
```

Other images can be automagically resized on the page with:

    <img eleventy:widths="200,600" src="/static/CLCS-46.jpg" alt="Learn@DLF" class="h-full w-full rounded-xl lg:min-h-[450px] object-cover"/>
