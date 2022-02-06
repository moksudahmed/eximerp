/**
	Generated by sails-inverse-model
	Date:Sat Nov 23 2019 17:44:33 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    
    tableName: 'b_tbl_PurchaseOrderDetails',
    primaryKey: 'purchaseOrderDetailsID',


    attributes: {
        id: false,

        itemID: {
            type: 'integer',
            required: true
        },
        quantity: {
            type: "float",
            required: true
        },
        unitPrice: {
            type: "float",
            required: true
        },
        weight: {
            type: "float",
            required: true
        },
        purchaseOrderDetailsID: {
            type: 'number',
            unique: true,
            'autoIncrement': true
          },
        purchaseOrderID: {
            type: 'integer',
            required: true
        },

        purchaseOrderID: {
            model: 'purchaseorder'
          }
    }
};