# forum2025.diglib.org 🌬️

This repository contains the source for the DLF Forum 2025 website. The site is built with [Eleventy](https://www.11ty.dev/) and [Tailwind CSS](https://tailwindcss.com/).

## Local development

### Prerequisites
- [Node.js](https://nodejs.org/) 20 or later (npm is included)

### Getting started
1. Clone this repository
   ```bash
   git clone https://github.com/clirdlf/forum2025.diglib.org.git
   cd forum2025.diglib.org
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start a development server
   ```bash
   npm start
   ```
   Your site is now available at [http://localhost:8080](http://localhost:8080).
4. (Optional) Run the unit tests
   ```bash
   npm test
   ```
5. Build the production version
   ```bash
   npm run build
   ```
   The generated files can be found in the `_site` directory.

## Deployment workflow

Deployment is handled automatically through [GitHub Actions](https://github.com/features/actions). Pushing to the `main` or `dev` branch triggers `.github/workflows/deploy.yml` which installs dependencies, builds the site, and publishes `_site` to GitHub Pages.

For more information on GitHub Pages deployments, see the [official documentation](https://docs.github.com/en/pages).

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
