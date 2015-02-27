/**
 * Subscribes to a list of roles the current user is assigned.
 */
Tracker.autorun(function(){
	Meteor.subscribe('krtAuthorizeCurrentRoles');
});

Template.registerHelper('hasPermission', function(permission) {
	return KRT.Authorize.hasPermission(Meteor.userId(), permission);
});
