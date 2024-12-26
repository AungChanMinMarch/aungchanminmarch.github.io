const anchor = require('./_includes/components/anchor.js')
const anchorTag = require('./_includes/shortcodes/anchorTag.js')

const analysisToc = require('./_includes/components/analysisToc.js');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addShortcode("a", anchor);
  eleventyConfig.addShortcode("toc", analysisToc);
  eleventyConfig.addShortcode('aTag', anchorTag);

  eleventyConfig.addPassthroughCopy({ "assets/css/style.css": "assets/style.css" });
  eleventyConfig.addPassthroughCopy("assets/topology");
  eleventyConfig.addPassthroughCopy("assets/img");

  eleventyConfig.addCollection('topology', function(collectionApi) {
    return collectionApi.getAllSorted().filter(item => item.inputPath.includes('/topology/'));
  });

   // Create a collection of unique tags 
  eleventyConfig.addCollection("tagsList", function(collectionApi) {
    let tagSet = new Set();
    collectionApi.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        tags = tags.filter(tag => !["all", "nav", "post", "posts"].includes(tag));
        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
    return [...tagSet];
  });
eleventyConfig.setServerOptions({
		module: "@11ty/eleventy-server-browsersync",

	host: '0.0.0.0',
		port: 8080,
		open: false,
		notify: false,
		ui: false,
		ghostMode: false,
	});
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: '../_includes'
    },
  }
};

