/**
	Generated by sails-inverse-model
	Date:Sat Nov 23 2019 17:44:33 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    attributes: {
        increaseamount: {
            type: "float",
            required: true
        },
        insereseddate: {
            type: 'ref', 
            columnType: 'datetime',
            required: true
        },
        incrementid: {
            type: 'integer',
            required: false
        },
        monthlyid: {
            type: 'integer',
            required: true
        }
    }
};