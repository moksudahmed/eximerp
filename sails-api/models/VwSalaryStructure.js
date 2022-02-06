/**
	Generated by sails-inverse-model
	Date:Mon Dec 02 2019 13:58:25 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    attributes: {
        per_name: {
            type: 'text',
            required: true
        },
        designation: {
            type: 'string',
            required: true
        },
        status: {
            type: 'string',
            required: true
        },
        overtimerate: {
            type: "float",
            required: true
        },
        profiletype: {
            type: 'string',
            required: true
        },
        providentfund: {
            type: "float",
            required: true
        },
        taxrate: {
            type: "float",
            required: true
        },
        hourlyrate: {
            type: "float",
            required: true
        },
        commissionrate: {
            type: "float",
            required: true
        },
        paymenttype: {
            type: 'string',
            required: true
        },
        salaryprofileid: {
            type: 'integer',
            required: true
        },
        employeeid: {
            type: 'integer',
            required: true
        }
    }
};