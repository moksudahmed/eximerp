  /**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  
  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
 UserController: {
  update: 'isAuth',
  destroy: 'isAuth',
  token: 'isAuth'
},

'*': ['isAuth'], // Everything resctricted here
'UserController': { // Name of your controller
'create': true,
'login': true,
 // We dont need authorization here, allowing public access
}

  // '*': true,

};
