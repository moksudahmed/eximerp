/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  'get /api/tasks': 'TaskController.getTasks',
  'post /api/task': 'TaskController.createTask',
  'put /api/task/:id': 'TaskController.updateTask',
  'delete /api/task/:id': 'TaskController.deleteTask',

  'get /api/users': 'UserController.getUsers',

  'get /api/chartofaccount': 'ChartofaccountController.getChartofaccount',
   
  /**********************************************************************************************/

  /**  Organization router */
  'post /api/organization/create': {
		controller: 'OrganizationController',
		action: 'create',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
  },
  'post /api/organization/setup-business': {
		controller: 'OrganizationController',
		action: 'setupBusiness',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
  },

  'get /api/organization': {
      controller: 'OrganizationController',
      action: 'getAllOrganization',
      cors: {
      allowOrigins: ['http://localhost:4200'],
      allowCredentials: false
      }
   },
   'get /api/organization/getallbranch': {
		controller: 'OrganizationController',
		action: 'getOrganization',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
   },

   'POST /api/organization/find/:id': {
    controller: 'OrganizationController',
    action: 'find',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
   
/**                  End Organization router            */


  /**               Owner router                     */


  'POST /api/owner/create': {
		controller: 'OwnerController',
		action: 'create',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
  },
  
  'POST /api/owner/create-corporate-owner': {
		controller: 'OwnerController',
		action: 'createCorporateOwner',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
  },
  
  'GET /api/owners': {
    controller: 'OwnerController',
    action: 'getOwner',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
  'GET /api/owners-name': {
    controller: 'OwnerController',
    action: 'getOwners',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },

   
   'GET /api/client/owners': {
    controller: 'ClientController',
    action: 'getOwner',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
   'POST /api/owner/owner-orgnization/create': {
		controller: 'OwnerController',
		action: 'createPartner',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
  },
  
  'GET /api/client/witness': {
    controller: 'ClientController',
    action: 'getWitness',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
 
  'POST /api/client/create': {
		controller: 'ClientController',
		action: 'create',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
  },
  
/**                  End Owner router            */



 /**  Thirdpartagent router */
  
 'GET /api/third-party-agents': {
  controller: 'ThirdpartyagentController',
  action: 'getThirdPartyAgent',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'POST /api/client-agents/:type': {
  controller: 'ClientController',
  action: 'getThirdPartyAgent',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

/**     End     */
 /**  VwPartners router */
  
 'GET /api/partners': {
  controller: 'VwPartnersController',
  action: 'getPartners',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'POST /api/partners/find-by-organization/:id': {
  controller: 'VwPartnersController',
  action: 'findByOrganization',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

/**     End     */

/**  Branch router */

  'get /api/branch': {
		controller: 'BranchController',
		action: 'getAllBranch',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
   },
   'get /api/branch/getbranch': {
		controller: 'BranchController',
		action: 'getABranch',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
   },
   
   'post /api/branch/createbranch': {
		controller: 'BranchController',
		action: 'create',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
  },
  
  'post /api/branch/create': {
		controller: 'BranchController',
		action: 'create',
	   cors: {
		 allowOrigins: ['http://localhost:4200'],
		 allowCredentials: false
	   }
  },

  'post /api/branch/update/:id': {
    controller: 'BranchController',
    action: 'update',
    cors: {
      allowOrigins: ['http://localhost:4200'],
      allowCredentials: false
      }
   
},

'POST /api/branch/find/:id': {
  controller: 'BranchController',
  action: 'find',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'POST /api/branch/find-by-organization/:id': {
  controller: 'BranchController',
  action: 'findByOrganization',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'POST /api/branch/find-by-organization-purchase-order/:id': {
  controller: 'BranchController',
  action: 'findByOrganizationPurchaseOrder',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 /**                  End Branch router            */


/**  Department router */

'get /api/department': {
  controller: 'DepartmentController',
  action: 'getAllDepartment',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 'get /api/department/getdepartmentbybranch': {
  controller: 'DepartmentController',
  action: 'getDeapartmentByBranch',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
  },
 'get /api/department/getdeapartmentbyorganization': {
  controller: 'DepartmentController',
  action: 'getDeapartmentByOrganization',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }

 },
 'POST /api/department/find/:id': {
  controller: 'DepartmentController',
  action: 'find',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'POST /api/department/find-by-organization/:id': {
  controller: 'DepartmentController',
  action: 'findByOrganization',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'post /api/department/create': {
  controller: 'DepartmentController',
  action: 'create',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
},

 /**     End Department router    */

 

 /**  Factory router */
      
'get /api/factory': {
  controller: 'FactoryController',
  action: 'getAllFactory',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   },
  },
  
  'post /api/factory/create': {
    controller: 'FactoryController',
    action: 'create',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
  },
 

  'POST /api/factory/find/:id': {
    controller: 'FactoryController',
    action: 'find',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
   'POST /api/factory/find-by-organization/:id': {
    controller: 'FactoryController',
    action: 'findByOrganization',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
 /**     End Factory router    */

 
 /**  Warehouse router */


'get /api/warehouse': {
  controller: 'WarehouseController',
  action: 'getAllWarehouse',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'POST /api/warehouse/find/:id': {
  controller: 'WarehouseController',
  action: 'find',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'POST /api/warehouse/find-by-organization/:id': {
  controller: 'WarehouseController',
  action: 'findByOrganization',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 'POST /api/warehouse/create': {
  controller: 'WarehouseController',
  action: 'create',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
},


 /**     End     */


/**  Financialyear router */


'get /api/financialyear/index': {
  controller: 'FinancialyearController',
  action: 'index',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/financialyear': {
  controller: 'FinancialyearController',
  action: 'getAllFinancialYear',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 'get /api/financialyear/show': {
  controller: 'FinancialyearController',
  action: 'show',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
  'post /api/financialyear/create': {
    controller: 'FinancialyearController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },

 
 /**     End     */

 /**  ChartOfAccount router */
 
'get /api/chart-of-account': {
  controller: 'ChartofaccountController',
  action: 'getChartofaccount',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/chart-of-account/index': {
  controller: 'ChartofaccountController',
  action: 'index',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/chart-of-account/show': {
  controller: 'ChartofaccountController',
  action: 'show',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'get /api/chart-of-account/find/:id': {
  controller: 'ChartofaccountController',
  action: 'find',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'get /api/chart-of-account/findcategory/:name': {
  controller: 'ChartofaccountController',
  action: 'findByCategory',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/chart-of-account/get-account': {
  controller: 'ChartofaccountController',
  action: 'getDetermineAccount',
  cors: {
  allowOrigins: ['http://localhost:4200'],
  allowCredentials: false
  }
},
  'post /api/chart-of-account/create': {
    controller: 'ChartofaccountController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },

  'put /api/chart-of-account/update/:id' : {
    controller: 'ChartofaccountController',
    action: 'update',
    cors: {
      allowOrigins: ['http://localhost:4200'],
      allowCredentials: false
      }
   },

  'delete /api/chart-of-account/delete/:id' : {
    controller: 'ChartofaccountController',
    action: 'destroy',
    cors: {
      allowOrigins: ['http://localhost:4200'],
      allowCredentials: false
      }
   },
   'get /api/chart-of-account/find-subsididary-account': {
    controller: 'ChartofaccountController',
    action: 'findSubSididaryAccount',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },

   'get /api/chart-of-account/account-blance': {
    controller: 'ChartofaccountController',
    action: 'getAccounts',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
   
 /**     End     */
 
 
 /**  Transaction router */


'get /api/transaction/index': {
  controller: 'TransactionController',
  action: 'index',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/transaction/show': {
  controller: 'TransactionController',
  action: 'show',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'get /api/transaction': {
  controller: 'TransactionController',
  action: 'getTransactions',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
  'post /api/transaction/create': {
    controller: 'TransactionController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },

 
 /**     End     */

 
 /**  Journal router */

'get /api/journal': {
  controller: 'JournalController',
  action: 'getAllJournal',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

'get /api/journal/index': {
  controller: 'JournalController',
  action: 'index',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/journal/show': {
  controller: 'JournalController',
  action: 'show',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
  'post /api/journal/create': {
    controller: 'JournalController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },


  
 'get /api/vw-journal': {
  controller: 'VwAJournalController',
  action: 'getJournal',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 
 'get /api/vw-journal/find/:name': {
  controller: 'VwAJournalController',
  action: 'findByName',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 

 /**     End     */


 /**  Ledger router */

 'get /api/ledger': {
  controller: 'VwALedgerController',
  action: 'getLedger',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 
 'get /api/ledger/find/:name': {
  controller: 'VwALedgerController',
  action: 'findByName',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 

 
 
 /**     End     */

 /**  Accounting router */

 'get /api/accounting/income-statement': {
  controller: 'AccountingController',
  action: 'getIncomeStatement',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'get /api/accounting/trial-balance': {
  controller: 'AccountingController',
  action: 'getTrialBalance',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 'get /api/accounting/journal/:name': {
  controller: 'AccountingController',
  action: 'getJournal',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'get /api/accounting/balance-sheet': {
  controller: 'AccountingController',
  action: 'getBalanceSheet',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 /**     End     */

  /**  Payment router */


'get /api/payment': {
  controller: 'PaymentController',
  action: 'index',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/payment/show': {
  controller: 'PaymentController',
  action: 'show',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
  'post /api/purchase/payment/create': {
    controller: 'PaymentController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },

  'POST /api/purchase/supplier/:id': {
    controller: 'ClientController',
    action: 'calculateBalance',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
 
 /**     End     */

 

  /**  SubSidiaryAccount router */


'get /api/sub-sidiary-account': {
  controller: 'SubsidiaryaccountController',
  action: 'index',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/sub-sidiary-account/show': {
  controller: 'SubsidiaryaccountController',
  action: 'show',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
'POST /api/sub-sidiary-account/find/:id': {
  controller: 'SubsidiaryaccountController',
  action: 'find',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'POST /api/sub-sidiary-account/find-by-chart-of-account/:id': {
  controller: 'SubsidiaryaccountController',
  action: 'findByChartOfAccount',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'GET /api/sub-sidiary-account/find-by-chart-of-account-id/:id': {
  controller: 'SubsidiaryaccountController',
  action: 'findByChartOfAccount',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'GET /api/sub-sidiary-account/get-all-account': {
  controller: 'SubsidiaryaccountController',
  action: 'getAllAccount',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 'GET /api/sub-sidiary-account/get-account': {
  controller: 'SubsidiaryaccountController',
  action: 'findAccount',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'post /api/transaction/create': {
    controller: 'TransactionController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },

  /**  Item router */
  'post /api/item/create': {
    controller: 'ItemController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },

  'get /api/item': {
    controller: 'ItemController',
    action: 'getItem',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },

   
  'get /api/allitem': {
    controller: 'ItemController',
    action: 'getAllItem',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
   'get /api/item/find/:id': {
    controller: 'ItemController',
    action: 'findById',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
   'get /api/item/findbyterm': {
    controller: 'ItemController',
    action: 'findByTerm',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   

 /**     End     */
 
  /**  Stock Level router */
  
  'get /api/stock-level': {
    controller: 'StocklevelController',
    action: 'getStockLevel',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
   'post /api/stock-level/create': {
    controller: 'StocklevelController',
    action: 'create',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
    
   'GET /api/stock-balance/:id': {
    controller: 'StocklevelController',
    action: 'getStocklBalance',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
 'get /api/stock-level/find/:id': {
  controller: 'StocklevelController',
  action: 'findByItemId',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 /**     End     */

   /**  Stock router */
  
   'get /api/stock': {
    controller: 'VwStockController',
    action: 'getStock',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  

  

 /**     End     */
 

  /**  CustomerOrder router */

  
  'get /api/order': {
    controller: 'CustomerorderController',
    action: 'getOrder',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
  
'get /api/order/index': {
  controller: 'CustomerorderController',
  action: 'index',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/order/show': {
  controller: 'CustomerorderController',
  action: 'show',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
  'post /api/order/create': {
    controller: 'CustomerorderController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },
  'POST /api/order/find-by-organization/:id': {
    controller: 'CustomerorderController',
    action: 'findByOrganization',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
  'POST /api/order/find-by-order-id/:id': {
    controller: 'CustomerorderController',
    action: 'findByOrderID',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
 
 /**     End     */


  /**  Orderdetails router */


  'get /api/order-details': {
    controller: 'OrderdetailsController',
    action: 'index',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
   'get /api/order-details/show': {
    controller: 'OrderdetailsController',
    action: 'show',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
    'post /api/transaction/create': {
      controller: 'TransactionController',
      action: 'create',
      cors: {
      allowOrigins: ['http://localhost:4200'],
      allowCredentials: false
      }
    },
  
   
   /**     End     */
  

  /**  Billingaddress router */


  'get /api/billing-address': {
    controller: 'BillingaddressController',
    action: 'index',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
   'get /api/billing-address/show': {
    controller: 'BillingaddressController',
    action: 'show',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
    'post /api/transaction/create': {
      controller: 'TransactionController',
      action: 'create',
      cors: {
      allowOrigins: ['http://localhost:4200'],
      allowCredentials: false
      }
    },
  
   
   /**     End     */

   
  /**  DeliveryAddress router */


  'get /api/delivery-address': {
    controller: 'DeliveryaddressController',
    action: 'index',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
   'get /api/delivery-address/show': {
    controller: 'DeliveryaddressController',
    action: 'show',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
    'post /api/transaction/create': {
      controller: 'TransactionController',
      action: 'create',
      cors: {
      allowOrigins: ['http://localhost:4200'],
      allowCredentials: false
      }
    },
  
   
   /**     End     */


  /**  Category router */
  

  'get /api/category': {
    controller: 'CategoryController',
    action: 'getCategory',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  'get /api/category/index': {
    controller: 'CategoryController',
    action: 'index',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
   'get /api/category/show': {
    controller: 'CategoryController',
    action: 'show',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },

   'POST /api/category/create': {
    controller: 'CategoryController',
    action: 'create',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
   
    'post /api/transaction/create': {
      controller: 'TransactionController',
      action: 'create',
      cors: {
      allowOrigins: ['http://localhost:4200'],
      allowCredentials: false
      }
    },
  
   
   /**     End     */


   /**  Person router */


  'get /api/person': {
    controller: 'PersonController',
    action: 'getAllPerson',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
 
   /**     End     */

   /**  Employee router */


   'get /api/employee': {
    controller: 'EmployeeController',
    action: 'getAllEmployee',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  
   
   'post /api/employee/create': {
    controller: 'EmployeeController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },

   /**     End     */

    /**  VwEmployees router */


    'get /api/allemployee': {
      controller: 'VwEmployeeController',
      action: 'getAllEmployee',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },
    
     
     /**     End     */
  

    /**  VwEmployees router */


    'get /api/clientaccount': {
      controller: 'ClientaccountController',
      action: 'getClientAccount',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },
    
     
     /**     End     */
     
    /**  VwCustomer router */


    'get /api/customer': {
      controller: 'VwCustomerController',
      action: 'getCustomer',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },
     'get /api/find-customer': {
      controller: 'VwCustomerController',
      action: 'findCustomer',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },
     'get /api/find-customer-contact/:id': {
      controller: 'ContactinfoController',
      action: 'findCustomerContactIno',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },
     
     
     /**     End     */
     
    /**  VwIndividualCustomer router */


    'get /api/individual-customer': {
      controller: 'VwIndividualCustomerController',
      action: 'getIndividualCustomer',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },
    
     
     /**     End     */
  
    /**  VwIndividualCustomer router */


    'get /api/corporate-customer': {
      controller: 'VwCorporateCustomerController',
      action: 'getCorporateCustomer',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },
    
     
     /**     End     */
     
    /**  VwCorporateSupplier router */


    'get /api/corporate-supplier': {
      controller: 'VwCorporateSupplierController',
      action: 'getCorporateSupplier',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },

    'get /api/corporate-supplier/type/:category': {
      controller: 'VwCorporateSupplierController',
      action: 'getCorporateSupplier',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },
    
     
     /**     End     */

    /**  VwCorporateSupplier router */


    'get /api/individual-supplier': {
      controller: 'VwIndividualSupplier',
      action: 'getIndividualSupplier',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },

     'get /api/individual-supplier/type/:category': {
      controller: 'VwIndividualSupplier',
      action: 'getLocalIndividualSupplier',
       cors: {
       allowOrigins: ['http://localhost:4200'],
       allowCredentials: false
       }
     },
    
     
     /**     End     */
     
 
 /**  Purchase router */


'get /api/purchase/purchase-order': {
  controller: 'PurchaseorderController',
  action: 'getPurchaseOrder',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },


 'post /api/purchase/purchase-order/create': {
  controller: 'PurchaseorderController',
  action: 'create',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/purchase/findbyId/:id': {
  controller: 'PurchaseorderController',
  action: 'findById',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'POST /api/purchase/find-by-organization/:id': {
  controller: 'PurchaseorderController',
  action: 'findByOrganization',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'get /api/purchase/findbyterm': {
  controller: 'PurchaseorderController',
  action: 'findByTerm',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 

 'get /api/transaction/show': {
  controller: 'TransactionController',
  action: 'show',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
 'get /api/transaction': {
  controller: 'TransactionController',
  action: 'getTransactions',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },
 
  'post /api/transaction/create': {
    controller: 'TransactionController',
    action: 'create',
    cors: {
    allowOrigins: ['http://localhost:4200'],
    allowCredentials: false
    }
  },
  
 
 /**     End     */
 
 
 /**  Qutation router */


'get /api/purchase/qutation': {
  controller: 'QutationController',
  action: 'getQutation',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 /**     End     */

  /**  Purchase-request router */


'get /api/purchase/purchase-request': {
  controller: 'PurchaserequestController',
  action: 'getPurchaseRequest',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'post /api/purchase/purchase-request/create': {
  controller: 'PurchaserequestController',
  action: 'create',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 'GET /api/purchase/purchase-request/findbystatus/:status': {
  controller: 'PurchaserequestController',
  action: 'findByStatus',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 /**     End     */

 /**  Purchase-request Cart router */


'get /api/purchase/purchase-request-cart/:id': {
  controller: 'PurchaserequestcartController',
  action: 'getPurchaseRequestCart',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 /**     End     */
 
  /**  Qutation router */


'get /api/purchase/supplier': {
  controller: 'SupplierController',
  action: 'getSupplier',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 /**     End     */
  
 
 
  /**  LC router */


'get /api/purchase/letter-credit': {
  controller: 'LettercreditController',
  action: 'getLC',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 /**     End     */
 
  /**  LC router */


'get /api/purchase/sales-contract': {
  controller: 'SalescontractController',
  action: 'getSalesContract',
   cors: {
   allowOrigins: ['http://localhost:4200'],
   allowCredentials: false
   }
 },

 /**     End     */
 
// 'post /api/add': 'PersonController.addPerson',
  
  'post /user/login': 'UserController.login',
  'get /user/token': 'UserController.token',
  //'get /user/user-info': 'UserController.getABranch',

  'post /api/user/initial-value': {
    controller: 'UserController',
    action: 'getInitialValue',
     cors: {
     allowOrigins: ['http://localhost:4200'],
     allowCredentials: false
     }
   },
  /*
  'get /api/person': 'PersonController.getAllPerson',
  'get /api/get/:id': 'PersonController.getPersonById',
  'post /api/add': 'PersonController.addPerson',
  'post /api/update': 'PersonController.updatePerson',
  'get /api/delete/:id': 'PersonController.deletePerson',*/
  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
