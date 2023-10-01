

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets/*.css": "assets" });
  eleventyConfig.addShortcode("cba", function(theorem_number) {
    console.log(typeof theorem_number)
    const [ch, no] = theorem_number.toString().split(".");
    const chapter = (ch.length == 1) ? "0"+ ch : ch;
    const number = (no.length == 1) ? "0"+ no : no;
    
    const href = `/analysis/ch${chapter}/theorems/theorem-${ch}-${number}`;
    return `<a href='${href}'>Theorem ${theorem_number}</a>`
  });
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: '../_includes'
    }
  }
};