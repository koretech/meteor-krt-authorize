Package.describe({
	name: 'krt:authorize',
	summary: 'Koretech Authorize Package',
	version: '0.2.0',
	git: 'https://github.com/koretech/meteor-krt-authorize.git',
	documentation: null
});

Package.onUse(function(api){

	api.versionsFrom('METEOR@1.0');

	api.use([
		'underscore',
		'accounts-base',
		'tracker',
		'check',
		'templating',
		'krt:core@0.1.2',
		'alanning:roles@1.2.13'
	], ['client', 'server']);

	api.imply([
		'accounts-base',
		'krt:core',
		'alanning:roles@1.2.13'
	]);

	api.addFiles([
		'namespaces.js',
		'lib/authorize_common.js'
	], ['client', 'server']);

	api.addFiles([
		'lib/authorize_client.js'
	], 'client');

	api.addFiles([
		'lib/authorize_server.js'
	], 'server');

});
