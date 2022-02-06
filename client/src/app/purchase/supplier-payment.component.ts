import { Component, OnInit } from '@angular/core';
import { PurchaseRequest,  PurchaseOrder, SalesContract, PurchaseOrderDetails, PurchaseRequestCart, LC, Local, Qutation, Supplier } from '../purchase/purchase';
import { Department } from '../organizations/organization';
import { CorporateSupplier , IndividualSupplier } from '../purchase/purchase';
import { Item } from '../products/item';
import { Payment } from '../sales/sales';
import { PurchaseService } from '../services/purchase.service';
import { OrganizationService } from '../services/organization.service';
import { AccountingService  } from '../services/accounting.service';
import { Observable } from 'rxjs/Observable';
import { Transaction, ChartOfAccount, Journal } from '../accountings/accounting';
import { ClientService  } from '../services/client.service';

@Component({
  selector: 'app-supplier-payment',
  templateUrl: './supplier-payment.component.html',
  styleUrls: ['./supplier-payment.component.scss']
})

export class SupplierPaymentComponent implements OnInit {
  private transactions:Transaction;
  private payment: Payment;
  private journals: Journal[] =[];
  journal: Journal;
  order : PurchaseOrder[] = [];
  private local :Supplier[] = [];
  private inidividualSupplier : Observable<IndividualSupplier[]>;    
  selectedID : any;
  selectedOrder: any;
  param : any;
  balance = 0;
  due = 0.0;
  private type: any[] = [ { name: 'Cash', value:'cash'},{ name: 'Cheque', value:'cheque'}];
  private nature: any[] = [ { name: 'debit'},{ name: 'credit'}];  
  private transactionType: any[]=[ {name:'Sales', value:1} , 
                                   {name:'Purchases', value:2},
                                   {name: 'Make Payment', value:3},
                                   {name: 'Receive Payment', value:4}];
  private accounts: ChartOfAccount[] =[];
  show = false;
  private supplier: Observable<Supplier[]>;  
  constructor(public acService:AccountingService, public pservice:PurchaseService,
              public cservice:ClientService) {
              
              this.transactions = new Transaction(); 
              this.payment = new Payment();
              this.payment.status = 'paid';
              this.transactions.transactionDate = new Date();
              this.journal = new Journal();  
   }

  ngOnInit() {
    this.getOrder();
    this.getAccounts();
    this.getLocalSupplier();
  }
  
 getAccounts(): void {  
  this.acService.getAllChartOfAccounts().subscribe(cAccounts => {
    this.accounts = cAccounts['chartofaccount']; 
    console.log(this.accounts);
  });
 
}

getOrder(){   
  this.pservice.getPurchaseOrder().subscribe(order => {
    this.order = order['order']; 
  });
  
}
getLocalSupplier(): void{
  this.pservice.getLocalSupplier().subscribe(local => {
    this.local = local['supplier']; 
  });
}

getSupplierBalance(id): void{
  this.pservice.getSupplierBalance(id).subscribe(b => {
    this.balance = b['balance']; 
    if (this.balance['rows'][0].balance != null){
        this.due = this.balance['rows'][0].balance;
    }else {this.due = 0;}      
  });
}

filterChanged(selectedValue:number){ 
  //    alert(selectedValue);
      this.selectedOrder = selectedValue;
      var index = this.order.indexOf(this.order.filter(x => x.purchaseOrderID == selectedValue)[0]); 
      if(index === -1)
        this.selectedID ='';
      else
        this.selectedID = this.order[index].localID;
      this.payment.clientAccountID = this.selectedID;
  }
  filterChanged2(selectedValue:number){ 
    //    alert(selectedValue);
       // this.getRequestCart(selectedValue); 
        var index = this.local.indexOf(this.local.filter(x => x.supplierID == selectedValue)[0]); 
    //    if (this.local[index].type == 'local'){         
          if(this.local[index].category == 'individual'){
            this.cservice.getIndividualSupplierType('local').subscribe(supplier => {
              this.inidividualSupplier = supplier['supplier']; 
            });
            this.show = true;
          }
          else{
            this.cservice.getCorporateSupplierType('corporate').subscribe(supplier => {
              this.supplier = supplier['supplier']; 
            });
            this.show = false;
          }

          this.getSupplierBalance(selectedValue);
         
  //   }
    }
   
onFormSubmit({ value, valid}: { value: Transaction, valid: boolean }) {
 
    var dindex = this.accounts.indexOf(this.accounts.filter(x => x.accountName == 'Purchase')[0]); 
    this.addJournalEntry(this.accounts[dindex].chartOfAccountID, this.payment.amount,'debit',this.transactions.transactionTitle);
    var cindex = this.accounts.indexOf(this.accounts.filter(x => x.accountName == 'Account Payable')[0]); 
    this.addJournalEntry(this.accounts[cindex].chartOfAccountID, this.payment.amount,'credit',this.transactions.transactionTitle);
    

    this.param = {'payment': this.payment, 
                'transaction': this.transactions,
                'journal': this.journals};
 
    let body = JSON.stringify(this.param);
  
    this.pservice.addPurchasePayment(this.param)                    
              .subscribe(
                (val) => {
                    alert("New Purchase Request successfuly created.")
                    console.log("POST call successful value returned in body", 
                                val);
                  // this.invoicePdf(val); 
                },
                response => {
                    console.log("POST call in error", response);
                },
                () => {
                    console.log("The POST observable is now completed.");
                });

    console.log(this.transactions);
    console.log(this.payment);
    console.log(this.journals);
}

addJournalEntry(account: number, amount: number, nature: string, particulars:string){
      this.journal = new Journal();
     // alert(this.natureType);    
      
      if (amount) {
        this.journal.amount = Number(amount); 
        this.journal.debitCredit = nature;
        this.journal.invoiceNo = this.selectedOrder;    
         
        this.journal.chartOfAccountID = Number(account);
        this.journal.subSidiaryAccountID =1; 
        this.journal.transactionID = null;
        this.journal.particulars = particulars;
        this.journals.push(this.journal);
     }
    
    }
}
