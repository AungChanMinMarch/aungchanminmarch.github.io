const anchor = require('./_includes/components/anchor.js')

const analysisToc = require('./_includes/components/analysisToc.js');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets/*.css": "assets" });
  eleventyConfig.addShortcode("a", anchor);
  eleventyConfig.addShortcode("toc", analysisToc);
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: '../_includes'
    }
  }
};