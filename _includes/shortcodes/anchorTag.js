module.exports = function(collections, urlId, text, id) {
	const page = collections.find(item => item.data.urlId == urlId);
	const urlString = (!!text) ? text : (page.data.title ?? urlId);
	if (page) {
		const url = id ? `${page.url}#${id}` : page.url;
		console.log(url)
		const title = page.data.title || key;
		return `<a href="${url}">${urlString}</a>`;
	} else {
	    return `<span>Page not found</span>`;
	}
}