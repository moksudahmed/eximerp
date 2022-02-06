/**
	Generated by sails-inverse-model
	Date:Mon Dec 02 2019 13:58:25 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    attributes: {
        barcode: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        discount: {
            type: "float",
            required: true
        },
        images: {
            type: 'string',
            required: true
        },
        itemtype: {
            type: 'string',
            required: true
        },
        maxorderquantity: {
            type: 'integer',
            required: true
        },
        name: {
            type: 'string',
            required: false
        },
        qrcode: {
            type: 'string',
            required: true
        },
        saleprice: {
            type: "float",
            required: true
        },
        unitprice: {
            type: "float",
            required: true
        },
        publish: {
            type: 'boolean',
            required: true
        },
        categoryid: {
            type: 'integer',
            required: false
        },
        itemid: {
            type: 'integer',
            required: false
        },
        sku: {
            type: 'string',
            required: true
        }
    }
};