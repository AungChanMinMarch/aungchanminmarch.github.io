module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      key: data => data.eleventyNavigation.key || data.key || data.fileSlug,
      parent: data => data.eleventyNavigation.parent || data.parent,
      title: data => data.eleventyNavigation.title || data.title
    }
  }
};