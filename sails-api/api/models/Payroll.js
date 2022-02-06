/**
	Generated by sails-inverse-model
	Date:Sat Nov 23 2019 17:44:33 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    attributes: {
        approve: {
            type: 'ref', 
            columnType: 'datetime',
            required: true
        },
        paydate: {
            type: 'ref', 
            columnType: 'datetime',
            required: true
        },
        payfrom: {
            type: 'ref', 
            columnType: 'datetime',
            required: true
        },
        payto: {
            type: 'ref', 
            columnType: 'datetime',
            required: true
        },
        prepearedate: {
            type: 'ref', 
            columnType: 'datetime',
            required: true
        },
        status: {
            type: 'string',
            required: true
        },
        tax: {
            type: "float",
            required: true
        },
        totalgrosspay: {
            type: "float",
            required: true
        },
        totalnetpay: {
            type: "float",
            required: true
        },
        chartofaccountid: {
            type: 'integer',
            required: true
        },
        payrollid: {
            type: 'integer',
            required: false
        },
        employeeid: {
            type: 'integer',
            required: true
        }
    }
};