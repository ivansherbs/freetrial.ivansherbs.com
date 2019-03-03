exports.install = function() {
	// Enable CORS for API
	CORS('/api/*', ['get', 'post', 'put', 'delete'], true);

	// Eshop
	ROUTE('/api/products/prices/',          ['*Product --> prices']);
	ROUTE('/api/products/search/',          ['*Product --> search']);
	ROUTE('/api/orders/create/',            ['*Order --> create', 'post']);
	ROUTE('/api/orders/dependencies/',      ['*Order --> dependencies']);

	// Newsletter view
	FILE('/newsletter.gif', file_newsletterviewstats);
};

function file_newsletterviewstats(req, res) {
	NOSQL('newsletters').counter.hit('all');
	req.query.id && NOSQL('newsletters').counter.hit(req.query.id);
	res.binary('R0lGODdhAQABAIAAAAAAAAAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==', 'image/gif', 'base64');
}
