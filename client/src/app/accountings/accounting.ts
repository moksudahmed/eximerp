import { NumberValueAccessor } from "@angular/forms/src/directives";

  export class FinancialYear {
    startDate: Date;
    endDate: Date;
    financialYearID:number;
    yearName:string;
    constructor(values: Object = {}) {
         //Constructor initialization
         Object.assign(this, values);
     }
    
   }

 
 export class ChartOfAccount {
    chartOfAccountID: number;
    categoryType: string;
    accountName: string;
    desription: string;
    underCategory: string;   
    natureType: string;      
    balance: number;
    constructor(values: Object = {}) {
         //Constructor initialization
         Object.assign(this, values);
     }
    
   }
 
   export class SubSidiaryAccount {
    accountName: string;
    accountNo: number;
    address: string;
    branch: string;
    subSidiaryAccountID: number;
    chartOfAccountID: number;    
    type: string;
    accountHolder:string;
    constructor(values: Object = {}) {
         //Constructor initialization
         Object.assign(this, values);
     }
    
   }
   export class Transaction{
    transactionDate: Date;      
    transactionTitle: string;            
    entryDateTime: Date;
    transactionID: number;
    financialYearID: number;
    branchID: number;   
    userID: number;
    paymentID: number;  
      constructor(values: Object = {}) {
          this.userID = 1;
          this.branchID = 1;
          this.financialYearID = 1;
        //  this.paymentID = 118;
           //Constructor initialization         
           Object.assign(this, values);
       }
      
     }

     export class Journal{
      particulars: string;
      invoiceNo: string;    
      debitCredit: string;
      amount: number;       
      chartOfAccountID: number;  
      subSidiaryAccountID: number;  
      transactionID: number;  
       constructor(values: Object = {}) {      
          this.transactionID = null;      
          //Constructor initialization
          Object.assign(this, values);
      }
   
    }

    export class VwJournal{
      branchID:number;
      date:Date;
      transactionID: number;
      transactionTitle: string;
      categoryType: string;
      account:string;
      journalID:number;
      financialYearID:number;
      debitCredit:string;
      amount: number;
      constructor(values: Object = {}) {      
          //Constructor initialization
          Object.assign(this, values);
      }
   
    }
    

    export class Ledger{
     id: number;
    date: Date;
    transactionTitle: string;
    accountName: string;
    debitCredit: string;
    amount: number;
      constructor(values: Object = {}) {      
          this.id = null;      
          //Constructor initialization
          Object.assign(this, values);
      }  
      
    }
    
    export class IncomeStatement{
      accountnaturetype: string;
      accounttitle: string;
      totalamount: number;
      totalbalance: number
       constructor(values: Object = {}) {      
           //Constructor initialization
           Object.assign(this, values);
       }  
       
     }

     export class TrialBalance{  
      accounttitle: string;
      debit: string;
      credit: number;     
      constructor(values: Object = {}) {      
            //Constructor initialization
            Object.assign(this, values);
        }  
       
     }

      
      
     