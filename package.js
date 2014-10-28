Package.describe({
	summary: "Koretech Authorize Package",
	version: '0.1.0'
});

Package.onUse(function(api){

	api.use([
		'underscore',
		'accounts-base',
		'krt-core@0.1.0',
		'alanning:roles@1.2.13'
	], ['client', 'server']);

	api.imply([
		'accounts-base',
		'krt-core',
		'alanning:roles'
	]);

	api.addFiles([
		'namespaces.js',
		'util.js'
	], ['client', 'server']);

});