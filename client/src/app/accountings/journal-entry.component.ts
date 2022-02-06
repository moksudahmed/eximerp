import { Component, OnInit } from '@angular/core';
import { TransactionService  } from '../services/transaction.service';
import { ChartofaccountsService  } from '../services/chartofaccounts.service';
import { AccountingService } from '../services/accounting.service';
import { Journal, Transaction, ChartOfAccount} from './accounting';
import { AccountingsRoutingModule } from './accountings-routing.module';
import { NgModule } from '@angular/core';
import { ChartOfAccountComponent } from './chartofaccount.component';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ArgumentOutOfRangeError, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { UrlHandlingStrategy } from '@angular/router';


@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss']  
})

export class JournalEntryComponent implements OnInit{
  editField: string;
  
  private trans : Observable<Transaction[]>;    
  private t: Transaction[];
  tranDate = new Date();
  private transactions:Transaction;
  private _transactions:Transaction[] = [];
  private journals: Journal[] = [];
  param: any;
  
  journal: Journal;
  index:number;
  selectedCategory: string;
  selectedAccount: number;
  selectedNature: string = ''; 
  natureType: string = ''; 
  paymentType: string = 'cash';
  private assetsExpenseNature: any[] = [{increase:'Debit'},{decrease:'Credit'}];
  private liabilityIncomeEquityNature: any[] = [{increase:'Credit'},{decrease:'Debit'}];
  
  public chartOfAccount: ChartOfAccount[];
  
  public creditAccounts:any;
 
  private account : ChartOfAccount[] = [];   
  private cAccounts: ChartOfAccount[];

  public todos$: Observable<ChartOfAccount[]>;
 
  payment:string[] =['debit','credit']; 

  private category: any[] = [{name:'Assets', nature:'Dr.'},
                             {name: 'Expense', nature:'Dr.'},
                             {name: 'Liabilities', nature:'Cr.'},
                             {name: 'Revenue', nature:'Cr.'},
                             {name: 'OwnerEquity', nature:'Cr.'}];
 private type: any[] = [{name:'Payment'},
                        {name:'Journal Entry'},
                        {name: 'Purchase'},
                        {name: 'Contra'},
                        {name: 'Sales'},
                        {name: 'Credit Note'},
                        {name: 'Debit Note'},
                        {name: 'Sales Receipt'},
                        {name: 'Check'},
                        {name: 'Bill Payment'},
                        {name: 'Refund'},
                        {name: 'Transfer'}];
 
  private debitAccount: any[]=[];
  private creditAccount: any;
   // 
  constructor(
   public service:TransactionService,
   public accountsService:ChartofaccountsService,
   public aservice: AccountingService,
   private datePipe: DatePipe
  )   
  { 
    //this.getAccounts();
    this.index = 0;
   // this.tranDate = this.datePipe.transform(this.tranDate, 'yyyy-MM-dd');
  
  }
  private accounts: ChartOfAccount[];

  singleTodo: any[];

  async ngOnInit() {
  this.transactions = new Transaction(); 
    this.journal = new Journal();  
    this.getAllAccounts();
    this.getTransactions();
   // this.determineAccount();
   
}
getAllAccounts(): void {
  this.aservice.getAllChartOfAccounts().subscribe(cAccounts => {
    this.account = cAccounts['chartofaccount']; 
  });
  
}

  onTransactionFormSubmit({ value, valid}: { value: Transaction, valid: boolean }) {
    this.transactions = value; 
    this.transactions.transactionDate =  new Date();    
    this.transactions.branchID = 1;
    
    this.transactions.financialYearID = 1;
    this.transactions.entryDateTime = new Date();    
    
    this.transactions.userID = 1;
    
    this.transactions.paymentID = 118;
    this._transactions.push(this.transactions);
    console.log("Ju",this._transactions);
    
    /*this.param = {'transaction': this.transactions,'journal': this.journals};
    let body = JSON.stringify(this.param);
    console.log(this.param);
    this.param = {'salescontract': this.model};*/
    
     let body = JSON.stringify(this.param);
     this.aservice.addTransaction(this._transactions, this.journals);
 
/*    this.service.addTransaction(this.param)                    
                .subscribe(
                  (val) => {
                      console.log("POST call successful value returned in body", 
                                  val);
                  },
                  response => {
                      console.log("POST call in error", response);
                  },
                  () => {
                      console.log("The POST observable is now completed.");
                  });
    */
      // this.goBack();
      // this.transactions = new Transaction(); 
      // this.journal = new Journal();  
      // while(this.journals.length > 0) {
      //     this.journals.pop();
      // }
  }
  addTransactions(){  
    
    this.service.addTransaction(this.transactions)
        .subscribe(()=> this.goBack())
  }
  getTransactions(): void {
    this.aservice.getTransactions().subscribe(t => {
      this.trans = t['transaction']; 
    });
   
  }
  
  deleteTransaction(id){
        this.service.deleteTransaction(id)
        .subscribe(()=>{
          this.getTransactions();
        })  
    } 
    getAccounts(name: string){        
     this.aservice.getChartOfAccountByCategory(name).subscribe(account => {
      this.accounts = account['account']; 
      console.log(this.accounts);
    });
     
      
   }

   goBack(){
        this.getTransactions();
    }
  
  setToRentControl(value){
  //  this.vm.toRent.updateValue(value);
   // alert(value); //true/false
}
  setAccount(id: any): void { 
      this.journal.chartOfAccountID = 46;     
  }
  calculateBalance() {
    var balance = 0;

      for(let _journal of this.journals)
          {
            if(_journal.debitCredit =='debit' )
                balance = balance + _journal.amount;
            else
                balance = balance - _journal.amount;
           
          }
      return balance;
    }
  radioChangeHandler (event: any) {
    //update the ui
    this.selectedNature = event.target.value;
    
  }
    
  getAccountID22(name:string){
    
    var index2 = this.account.find(e => 'Account Payable'.includes(e.accountName));
    console.log(index2);
   return -1;
 }

 getAccountID(name:string){ 
   return this.account.find(e => e.accountName === name).chartOfAccountID;
}  
 getAccountID2(name:string){
    
    return -1;//this.account.find(e => e.accountName === name)['chartOfAccountID'];
}

 getAccountName(id:number){   
    return this.account.find(e => e.chartOfAccountID === Number(id)).accountName;
 }   
     
  removeJournal(accountNo: number){
    let index = this.journals.findIndex(item => item.chartOfAccountID === accountNo); //find index in your array
    this.journals.splice(index, 1);    
 }
 filterChanged(selectedValue:string){ 

      this.getAccounts(selectedValue); 
      this.selectedCategory = selectedValue;
   }
   radioChange(event: string) {
    //this.filter['property'] = event.value;
    
    this.paymentType = event;
  }
  selectChangeHandler(event: number){
    this.selectedAccount = event;
  }

  addLadger(account:number,nature:string, amount:number){
    this.journal = new Journal();
    this.addJournalEntry(account, amount, nature, 'A/C Expense');
        /*
    if(this.paymentType == 'cash' || this.paymentType == 'credit'){
          this.addJournalEntry(account, amount,'debit', 'A/C Expense');
        
          this.aservice.determineAccount(this.getAccountName(account),'debit',this.paymentType)      
          .then((cAccounts) =>{
            this.creditAccount = cAccounts['results']['rows'][0]['determine_account']; 
            this.addJournalEntry(this.getAccountID(this.creditAccount), amount,'credit', 'A/C Expense');
          })
          .catch(error => console.log(error));
   }
   else{

        this.addJournalEntry(account, amount,'debit', 'A/C Expense');
            
        this.aservice.determineAccount(this.getAccountName(account),'debit',this.paymentType)      
        .then((cAccounts) =>{
          this.creditAccount = cAccounts['results']['rows'][0]['determine_account']; 
          this.addJournalEntry(this.getAccountID('Cash'), cashAmount,'credit', 'A/C Expense');
        })
        .catch(error => console.log(error));

        this.aservice.determineAccount(this.getAccountName(account),'debit',this.paymentType)      
        .then((cAccounts) =>{
          this.creditAccount = cAccounts['results']['rows'][0]['determine_account']; 
          this.addJournalEntry(this.getAccountID(this.creditAccount), Number(amount -cashAmount),'credit', 'A/C Expense');
        })
        .catch(error => console.log(error));
   }*/
    
  }
 
  addJournalEntry(account: number, amount: number, nature: string, particulars:string){
    this.journal = new Journal();
    if (amount) {
      this.journal.amount = Number(amount); 
      this.journal.debitCredit = nature;
      this.journal.invoiceNo = '1';     
       
      this.journal.chartOfAccountID = Number(account);
      this.journal.subSidiaryAccountID =1; 
      this.journal.transactionID = null;
      this.journal.particulars = particulars;
      this.journals.push(this.journal);
   }
  
  }
  addJournal(account: number, amount: number, particulars:string){
 
    this.journal = new Journal();
    this.addJournalEntry(account, amount,'debit', particulars);
      
}
  selectAccount(category){
    switch(category){
                  case 'Payment': this.getAccounts('Assets');            
                          break;
                  case 'Purchase':this.getAccounts('Expense');
                          break;                  
                  case 'Contra': this.getAccounts('Expense');
                          break;
                  case 'Sales':  this.getAccounts('Revenue');          
                          break;
                  case 'Credit Note':             
                          break;
                  case 'Debit Note':             
                          break;
                  case 'Receipt': this.getAccounts('Revenue');              
                          break;
                  case 'Bank Payment':this.getAccounts('Expense');               
                          break;
                  default: break;
    }
  }
  natureSelect(account: number, amount: number, particulars:string){ 
    switch(this.selectedCategory){
      case 'Assets':             
                this.addJournalEntry(this.selectedAccount, amount,'debit', particulars);
                this.addJournalEntry(this.getAssets(this.natureType), amount,'credit', particulars);                              
                break;
      case 'Expense':    
                if(this.natureType == 'cash'){
                  this.addJournalEntry(this.selectedAccount, amount,'debit','Test');
                  this.addJournalEntry(this.getExpense(this.natureType), amount,'credit',particulars);                        
                }      
                else if(this.natureType == 'credit'){
                  this.addJournalEntry(this.selectedAccount, amount,'debit',particulars);
                  this.addJournalEntry(this.getExpense(this.natureType), amount,'credit',particulars); 
                } 
                else{
                  this.addJournalEntry(this.selectedAccount, amount,'debit',particulars);
                  this.addJournalEntry(this.getExpense('cash'), amount,'credit',particulars); 
                  this.addJournalEntry(this.getExpense('credit'), amount,'credit',particulars);                        
                }     
                  
                break;
      case 'Liabilities':break;
      case 'Revenue': if(this.natureType == 'cash'){
                  this.addJournalEntry(this.selectedAccount, amount,'debit',particulars);
                  this.addJournalEntry(1, amount,'credit',particulars);        
                }
                else if(this.natureType == 'credit'){
                  this.addJournalEntry(this.selectedAccount, amount,'debit',particulars);
                  this.addJournalEntry(5, amount,'credit','Test');     
                }
                else{
                  this.addJournalEntry(this.selectedAccount, amount,'debit',particulars);
                  this.addJournalEntry(1, amount,'credit',particulars);        
                  this.addJournalEntry(5, amount,'credit',particulars);    
                }break;
      case 'OwnerEquity':
                if(this.natureType == 'cash'){
                  this.addJournalEntry(this.selectedAccount, amount,'debit',particulars);
                  this.addJournalEntry(this.getOwnerEquity(this.natureType), amount,'credit',particulars);                        
                }      
                else if(this.natureType == 'credit'){
                  this.addJournalEntry(this.selectedAccount, amount,'debit',particulars);
                  this.addJournalEntry(this.getOwnerEquity(this.natureType),amount,'credit',particulars); 
                } 
                else{
                  this.addJournalEntry(this.selectedAccount, amount,'debit',particulars);
                  this.addJournalEntry(this.getOwnerEquity('cash'), amount,'credit',particulars); 
                  this.addJournalEntry(this.getOwnerEquity('credit'), amount,'credit',particulars);                        
                 }    break;
      default: break;
      
    }    
}
  getAssets(type:string){
      if(type == 'cash'){
        return this.getAccountID('Cash');   
      }
      else{
        return this.getAccountID('Account Receivable');   
      }  
  }
  getExpense(type:string){
      if(type == 'cash'){
        return this.getAccountID('Cash');   
      }
      else{
        return this.getAccountID('Account Payable');   
      }  
  }
  getOwnerEquity(type:string){
    if(type == 'cash'){
      return this.getAccountID('Cash');   
    }
    else{
      return this.getAccountID('Account Payable');   
    }  
}

updateList(id: number, property: string, event: any) {
  const editField = event.target.textContent;
  this.journals[id][property] = editField;
}

remove(id: any) {
 // this.awaitingPersonList.push(this.personList[id]);
  this.journals.splice(id, 1);
}


changeValue(id: number, property: string, event: any) {
  this.editField = event.target.textContent;
}
}
