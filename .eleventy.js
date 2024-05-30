const anchor = require('./_includes/components/anchor.js')

const analysisToc = require('./_includes/components/analysisToc.js');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addShortcode("a", anchor);
  eleventyConfig.addShortcode("toc", analysisToc);


  eleventyConfig.addPassthroughCopy({ "assets/*.css": "assets" });
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

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: '../_includes'
    },
    serverOptions: {
      host: "0.0.0.0", // This binds the server to all interfaces
      port: 8080 // Default port, you can change this if needed
    }
  }
};

