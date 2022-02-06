/**
 * Accounting
 *
 * @description :: Server-side logic for managing VwALedger
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  addTransaction: async (req, res) => {
    Transaction.query('SELECT create_transaction($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11', 
    [  req.param('name') ] ,function(err, rawResult) {
      if (err) { return res.serverError(err); }
    
      return res.ok({
        success: true,
        journal: rawResult.rows
      });
      // (result format depends on the SQL query that was passed in, and the adapter you're using)
    
      // Then parse the raw result and do whatever you like with it.
    
      return res.ok();
    
    });
   
  },
  getIncomeStatement: async (req, res) => {
    //  VwAJournal.query('SELECT * from vw_a_journal where account = $1', [  req.param('name') ] ,function(err, rawResult) {
    //    if (err) { return res.serverError(err); }
        // Build our SQL query template.
        var NAMES_OF_PETS_SQL = `SELECT DISTINCT * from income_statement()`;

        // Send it to the database.
        var rawResult = await sails.sendNativeQuery(NAMES_OF_PETS_SQL, [ ]);

        sails.log(rawResult);
        // (result format depends on the SQL query that was passed in, and the adapter/dialect you're using)

        // Then parse the raw result and do whatever you like with it.

      //  return exits.success();
      
    
      return res.ok({
        success: true,
        income: rawResult.rows
      });
    //});
  },
  

     getTrialBalance: async (req, res) => {
        VwALedger.query('SELECT DISTINCT * from trial_balance()', function(err, rawResult) {        
        if (err) { return res.serverError(err); }
        return res.ok({
         success: true,
         balance: rawResult.rows
       });
       return res.ok();
      
      });
      },
      

      getJournal: async (req, res) => {
        //  VwAJournal.query('SELECT * from vw_a_journal where account = $1', [  req.param('name') ] ,function(err, rawResult) {
        //    if (err) { return res.serverError(err); }
            // Build our SQL query template.
            var NAMES_OF_PETS_SQL = `SELECT * FROM generate_journal($1)`;

            // Send it to the database.
            var rawResult = await sails.sendNativeQuery(NAMES_OF_PETS_SQL, [ req.param('name') ]);

            sails.log(rawResult);
            // (result format depends on the SQL query that was passed in, and the adapter/dialect you're using)

            // Then parse the raw result and do whatever you like with it.

          //  return exits.success();
          
        
          return res.ok({
            success: true,
            journal: rawResult.rows
          });
        //});
      },
      
     getBalanceSheet: async (req, res) => {
        VwALedger.query('SELECT * from balance_sheet()', function(err, rawResult) {        
        if (err) { return res.serverError(err); }
        return res.ok({
         success: true,
         balance: rawResult.rows
       });
       return res.ok();
      
      });
      },
};