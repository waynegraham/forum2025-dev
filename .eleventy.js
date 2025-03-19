const fs = require("fs");
const htmlmin = require("html-minifier-terser");
const { type } = require("os");
const { DateTime } = require("luxon");

const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime"); // https://github.com/5t3ph/eleventy-plugin-emoji-readtime

const { format } = require("path");

// 11ty plugins
const eleventyPluginHubspot = require('eleventy-plugin-hubspot');

module.exports = async function(eleventyConfig) {
  const { IdAttributePlugin } = await import("@11ty/eleventy");

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

  // Shortcodes
  eleventyConfig.addPlugin(emojiReadTime, {
		emoji: "📖",
	});

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

  // https://11ty.rocks/eleventyjs/data-arrays/#randomitem-filter
  eleventyConfig.addFilter("randomItem", (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
			format || "dd LLL yyyy"
		);
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
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
    portalId: 20251227,
    loadingMode: "lazy"
  });

  // https://www.11ty.dev/docs/plugins/id-attribute/
  eleventyConfig.addPlugin(IdAttributePlugin, {
		selector: "h1,h2,h3,h4,h5,h6", // default

		// swaps html entities (like &amp;) to their counterparts before slugify-ing
		decodeEntities: true,

		// check for duplicate `id` attributes in application code?
		checkDuplicates: "error", // `false` to disable

		// by default we use Eleventy’s built-in `slugify` filter:
		slugify: eleventyConfig.getFilter("slugify"),

		filter: function({ page }) {
			if(page.inputPath.endsWith("test-skipped.html")) {
				return false; // skip
			}

			return true;
		}
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
