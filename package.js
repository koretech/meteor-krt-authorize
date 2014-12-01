Package.describe({
	name: 'krt:authorize',
	summary: 'Koretech Authorize Package',
	version: '0.1.1',
	git: 'https://github.com/koretech/meteor-krt-authorize.git'
});

Package.onUse(function(api){

	api.versionsFrom('METEOR@1.0');

	api.use([
		'underscore',
		'accounts-base',
		'krt:core@0.1.0',
		'alanning:roles@1.2.13'
	], ['client', 'server']);

	api.imply([
		'accounts-base',
		'krt:core',
		'alanning:roles'
	]);

	api.addFiles([
		'namespaces.js',
		'util.js'
	], ['client', 'server']);

});
