const fs = require("fs");
const htmlmin = require("html-minifier-terser");
const { type } = require("os");

const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const { format } = require("path");

// 11ty plugins
const eleventyPluginHubspot = require('eleventy-plugin-hubspot');

module.exports = function(eleventyConfig) {

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  // Preprocessors
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/static": "./static/" });
  eleventyConfig.addPassthroughCopy({ "src/assets/": "./assets/"});

  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");

  var pathPrefix = "";
  if (process.env.GITHUB_REPOSITORY) {
    pathPrefix = process.env.GITHUB_REPOSITORY.split('/')[1];
  }

  // Filters
  eleventyConfig.addFilter("usd", function(value) {
    if (typeof value !== 'number') {
      return "Invalid Input";
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  });

  // Plugins
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "jpeg"],
    // output image widths
		widths: ["auto"],

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
  });

  //https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPlugin(eleventyPluginHubspot, {
    portalId: 20251227
  });

  return {
    dir: {
      input: "src",
      layouts: "_layouts",
      includes: "_includes"
    },
    pathPrefix
  }
};

function htmlminTransform(content, outputPath) {
  if( outputPath.endsWith(".html") ) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
    return minified;
  }
  return content;
}
