/**
	Generated by sails-inverse-model
	Date:Mon Dec 02 2019 13:58:25 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    attributes: {
        paymentterms: {
            type: 'string',
            required: true
        },
        import: {
            type: 'boolean',
            required: true
        },
        bankname: {
            type: 'string',
            required: true
        },
        contractno: {
            type: 'string',
            required: true
        },
        date: {
            type: 'date',
            required: true
        },
        deliveryperiodfrom: {
            type: 'date',
            required: true
        },
        deliveryperiodto: {
            type: 'date',
            required: true
        },
        iecno: {
            type: 'string',
            required: true
        },
        route: {
            type: 'string',
            required: true
        },
        determinationofmeserment: {
            type: 'string',
            required: true
        },
        modeoftransport: {
            type: 'string',
            required: true
        },
        paymentmethod: {
            type: 'string',
            required: true
        },
        salescontractid: {
            type: 'integer',
            required: false
        },
        lettercreditid: {
            type: 'integer',
            required: true
        },
        witnessid: {
            type: 'integer',
            required: true
        },
        internationalid: {
            type: 'integer',
            required: true
        }
    }
};