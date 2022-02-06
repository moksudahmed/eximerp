/**
	Generated by sails-inverse-model
	Date:Sat Nov 23 2019 17:44:33 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {

    tableName: 'b_tbl_Supplier',
    primaryKey: 'supplierID',
  

    attributes: {
        id: false,
        
        supplierID: {
            type: 'number',
            unique: true,
            'autoIncrement': true
          },
          departmentID: {
            type: 'integer',
            required: true
        },
        subSidiaryAccountID: {
            type: 'integer',
            required: true
        },
        type: {
            type: 'string',
            required: true
        },
        category: {
            type: 'string',
            required: true
        }
    }
};