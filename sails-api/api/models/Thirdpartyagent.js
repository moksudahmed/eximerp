/**
	Generated by sails-inverse-model
	Date:Sat Nov 23 2019 17:44:33 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    tableName: 's_tbl_ThirdPartyAgent',  
    primaryKey: 'thirdPartyAgendID',


    attributes: {
            id: false,
            thirdPartyAgendID:{
                type: 'number',
                unique: true,
                'autoIncrement': true 
            },
            category: {
                type: 'string',
                required: true
            },
            
            proprietor: {
                type: 'string',
                required: true
            },
            referenceNo: {
                type: 'string',
                required: true
            },            
            remarks: {
                type: 'string',
                required: true
            },
            tin: {
                type: 'string',
                required: true
            },
            vatNo: {
                type: 'string',
                required: true
            },
            name: {
                type: 'string',
                required: true
            },
            established: {
                type: 'string',
                required: true
            },
            clientID:{
                type: 'number',
                required: true,
                unique: true,
            },
    
        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // Add a reference to ChartOfAccount 
    clientID:{
        model:'client',
        unique: true
      }
   
    },
};