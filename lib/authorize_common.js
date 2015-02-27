Match.HasPermission = function(permission) {
	if (!(this instanceof Match.HasPermission)) {
		return new Match.HasPermission(permission);
	}
	this.permission = permission;
};
Match.HasPermission.prototype = new Match.Where();
Match.HasPermission.prototype.condition = function(obj) {
	if (!KRT.Authorize.hasPermission(obj, this.permission)) {
		throw new Match.Error('Permission denied');
	}
	return true;
};

Match.IsLoggedIn = function() {
	if (!(this instanceof Match.IsLoggedIn)) {
		return new Match.IsLoggedIn();
	}
};
Match.IsLoggedIn.prototype = new Match.Where();
Match.IsLoggedIn.prototype.condition = function(obj) {
	if (!_(obj).isString()) throw new Match.Error('User must be logged in.');
	if (!Meteor.users.findOne({_id:obj})) throw new Match.Error('User must be logged in.');
	return true;
};

KRT.Authorize._permissions = {};

/**
 * Define a set of permissions for a module
 * @param module
 * @param permissions
 */
KRT.Authorize.definePermissions = function(module, permissions) {

	_(permissions).each(function(description, permission){
		KRT.Authorize._permissions[permission] = {
			name: permission,
			description: description,
			module: module
		}
	});
};

/**
 * Get a list of all permissions or permissions for a specific module
 * @param module
 * @return {*}
 */
KRT.Authorize.getAllPermissions = function(module) {
	if (module) {
		return _.chain(KRT.Authorize._permissions).filter(function(p){
			return p.module == module;
		}).pluck('name').value();
	}
	return _(KRT.Authorize._permissions).keys();
};

/**
 * Return a list of roles that contain a permission(s)
 * @param permissions
 * @return {*}
 * @constructor
 */
KRT.Authorize.RolesForPermission = function(permissions) {

	if (!_.isArray(permissions)) {
		permissions = [permissions];
	}

	return Meteor.roles.find({permissions: {$in: permissions}},{
		fields: {name: 1}
	}).map(function(doc){
		return doc.name;
	});
};

/**
 * Determine whether a user has access to a permission
 * @param user
 * @param permissions
 * @return {*}
 */
KRT.Authorize.hasPermission = function(user, permissions) {
	return Roles.userIsInRole(user, KRT.Authorize.RolesForPermission(permissions));
};

