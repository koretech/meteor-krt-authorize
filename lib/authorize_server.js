/**
 * Publish current roles to the user
 */
Meteor.publish('krtAuthorizeCurrentRoles', function(){
	var roles = Roles.getRolesForUser(this.userId);
	return Meteor.roles.find({
		name: {$in: roles}
	}, {
		fields: {
			name: 1,
			permissions: 1
		}
	});
});

/**
 * Add permissions to a role
 * @param permission
 * @param role
 */
KRT.Authorize.addPermissionToRole = function(permission, role) {
	if (!KRT.Authorize._permissions[permission]) return;

	Meteor.roles.update({
		name: role
	}, {
		$addToSet: { permissions: permission }
	});
};

/**
 * Remove permissions from a role
 * @param permission
 * @param role
 */
KRT.Authorize.removePermissionFromRole = function(permission, role) {
	Meteor.roles.update({
		name: role
	}, {
		$pull: { permissions: permission }
	}, {
		multi: true
	});
};

// Debug
//Meteor.methods({
//	addPermissionToRole: KRT.Authorize.addPermissionToRole,
//	removePermissionFromRole: KRT.Authorize.removePermissionFromRole
//});
