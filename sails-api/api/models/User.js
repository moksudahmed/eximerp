/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require("bcryptjs");

module.exports = {
  tableName: 't_tbl_user',
  primaryKey: 'id',

  attributes: {
    name: {
      'type': 'text',
      'required': true
	  },
	  username: {
      'type': 'text',
      'required': true
	  },
	  email: {
      'type': 'text',
      'required': true
	  },
	  password: {
      'type': 'text',
      'required': true
    },
    personID:{
      type: 'integer',
      'required': true
    }
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  customToJSON: function() {
    // Retourne une copie du résultat sans le mot de passe
    return _.omit(this, ['password'])
  },

  beforeCreate: function(values, cb) {
    // Hash le password avant chaque création
    bcrypt.hash(values.password, 10, function(err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  }
};

