/**
	Generated by sails-inverse-model
	Date:Mon Dec 02 2019 13:58:25 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    attributes: {
        clientaccountid: {
            type: 'integer',
            required: true
        },
        accountname: {
            type: 'string',
            required: true
        },
        active: {
            type: 'boolean',
            required: true
        },
        suspended: {
            type: 'boolean',
            required: true
        },
        accountcreditlimit: {
            type: "float",
            required: true
        },
        customerorderid: {
            type: 'integer',
            required: true
        },
        status: {
            type: 'string',
            required: true
        },
        orderdate: {
            type: 'datetime',
            required: true
        },
        discount: {
            type: "float",
            required: true
        },
        ordertotal: {
            type: "float",
            required: true
        },
        paymentdate: {
            type: 'date',
            required: true
        },
        amount: {
            type: "float",
            required: true
        }
    }
};