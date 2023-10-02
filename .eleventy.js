const anchor = require('./_includes/components/anchor.js')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets/*.css": "assets" });
  eleventyConfig.addShortcode("a", anchor);
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: '../_includes'
    }
  }
};