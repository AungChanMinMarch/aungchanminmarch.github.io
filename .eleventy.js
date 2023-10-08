const anchor = require('./_includes/components/anchor.js')

const analysisToc = require('./_includes/components/analysisToc.js');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy({ "assets/*.css": "assets" });
  eleventyConfig.addShortcode("a", anchor);
  eleventyConfig.addShortcode("toc", analysisToc);
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: '../_includes'
    }
  }
};