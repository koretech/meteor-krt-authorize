/**
 * Checks to see if the id is the user logged in.
 * If the optional parameters publishUserId is specified returns true if id matches it.
 * @param {string} id - The user ID
 * @param {string} [publishUserId]
 * @returns {boolean}
 */
KT.Authorize.userIsSelf = function(id, publishUserId) {
	if (publishUserId && publishUserId === id) {
		return true
	}
	return id === Meteor.userId();
};

KT.Authorize.authorize = function(roles, group, publishUserId) {




//	if (!Roles.userIsInRole(this.userId, ['client-view']))
};


