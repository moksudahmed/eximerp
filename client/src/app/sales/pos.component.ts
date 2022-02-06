import { Component, OnInit, ViewChild, TemplateRef, Input, ElementRef   } from '@angular/core';
import { Order, OrderDetails, Items, Payment, Info, DeliveryAddress, BillingAddress } from './sales';
import { _StockLevel, Item } from '../products/item';
import { Customer, ContactInfo } from '../clients/client';
import * as jsPDF from 'jspdf';
import { SalesService  } from '../services/sales.service';
import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';
import { ProductService  } from '../services/product.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HomeModalComponent } from './home-modal.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientService  } from '../services/client.service';

interface Cart{
    id: number;
    itemID: number;
    name: string;
    quantity: number;
    unitPrice: number;
    discount:number;
    total: number;
}

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})

export class PosComponent implements OnInit {

  editField: string;
    
  @ViewChild('htmlData') htmlData:ElementRef;
  selectedPersonId : number;
  cart: Array<Cart> = [];
  id : number;
  netPay: number;
  cash: number;
  credit:number;
  allProduct: Map<number, Items>;
  placedOrder:any;
  placedOrderID:any;
  private info : Info;
  private discount = 0;
  private products: Item[];
  private loading: boolean = false;
  customer: Array<Customer> = [];
  _customer:ContactInfo;
  param: any;
  private _orderDetails: OrderDetails;
  public orderDetails: OrderDetails[]=[];
  private order: Order;
  private payment: Payment;
  private lineTotal = 0;
  private orderTotal = 0;
  contact:ContactInfo;
  selectedItemPrice: number;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  daliveryAddress: DeliveryAddress;
  billingAddress:BillingAddress;
  receivedAmount: number;
  creditAmount: number;
  stockLevel:_StockLevel[] = [];
  currentStock = 0;
  paymentType = ['Cash', 'Credit','Bank'];
  selectedPayment:string;
  constructor(public service:SalesService, 
    public eservice:EmployeeService,
    public pservice:PersonService, 
    public iservice:ProductService, 
    public cservice:ClientService, 
    private modalService: BsModalService) 
   { 
          //this.selectedItem = new Item();           
          this.payment = new Payment();
          this.order = new Order();
          this.creditAmount = 0.00;
          this.receivedAmount = 0.00;
          this.orderTotal = 0.00;
          this.discount = 0.00;
         // this.info = new Info;
          this.netPay = 0.00;
          this.cash = 0.00;
          this.credit = 0.00;
          this.placedOrderID = 232;
          this.info = new Info();
          this.contact = new ContactInfo();
          this.daliveryAddress = new DeliveryAddress();
          this.billingAddress =new BillingAddress();
          this.selectedPayment = "Cash";
          this._customer = new ContactInfo();
       //   this.selectedPersonId = new Customer();
         
    }
   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openConfirmDialog() {
    this.modalRef = this.modalService.show(HomeModalComponent);
    this.modalRef.content.onClose.subscribe(result => {
        console.log('results', result);
    })
}

doSearch(term: string) {
  this.loading = true;
  this.cservice.search(term).then(_ => (this.loading = false));
}

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(HomeModalComponent);     
    this.bsModalRef.content.title = 'Modal with component';        
    this.bsModalRef.content.closeBtnName = 'Close';   
    this.bsModalRef.content.emitData.subscribe((value) => {       
        this.receivedAmount = value
        }); 
        if (this.receivedAmount)
           this.creditAmount = this.orderTotal - this.receivedAmount;    
        else
           this.receivedAmount = 0;
  }
  ngOnInit() {    
    this.orderTotal = this.calculateTotal();
   // this.data = this.orderDetails;   
    this.getProducts();
    this.id = 0;
    this.getCustomer();
  }

  getCustomer(){     
    this.cservice.getCustomers()
    .then((profile) =>{
      this.customer = profile['customer']; 
      console.log(this.customer);
    })
    .catch(error => console.log(error));  
  }  
  
  searchCustomer(){
    this.cservice.getContactInfo(this.selectedPersonId).subscribe(x => {
      this.contact = x['contact']; 
      console.log(this.contact); 
    });
    
  }
 getProducts(): void {  
    this.iservice.getProduct().subscribe(item => {
    this.products = item['items']; 
  });
}
 
getProduct(id: number) : Items {
    return this.allProduct.get(id);
}
 
onChange(event) {
      this.selectedItemPrice = event.unitPrice;
      this.iservice.getStockLevelById(event).subscribe(level => {
        this.stockLevel = level['balance']; 
        this.currentStock = Number(this.stockLevel[0].calculate_stock_lebel);  
        console.log(this.currentStock); 
      });
     // console.log("It", this.selectedItemPrice); 
}
    
addProduct(itemid: number, qty:number, price:number) {  
 
    this._orderDetails = new OrderDetails();
    if(this.currentStock > 0 && this.currentStock >= qty){
    if (itemid) {
      if(this.searchDuplicateProduct(itemid[3])> -1 )        
      {
       
            let index = this.searchDuplicateProduct(itemid[3]);            
            this.cart[index].quantity = Number(this.cart[index].quantity + Number(qty));
            this.cart[index].total = Number(this.cart[index].quantity * price);// this.cart[index].unitPrice);
            this.orderTotal = this.calculateTotal();
      }
      else{
       
            this.id += 1;
            this._orderDetails.id = this.id;
            this._orderDetails.itemID = itemid[3];    
            this._orderDetails.name = this.getProductName(itemid[3]);            
            this._orderDetails.unitPrice = price;// this.getProductPrice(itemid[3]) ;// this.products.find( x => x.itemID === Number(id)).unitPrice;
            this._orderDetails.quantity = Number(qty);
            //this._orderDetails.discount = Number(discount);
            this.lineTotal = this._orderDetails.unitPrice * this._orderDetails.quantity;
            this._orderDetails.total = this.lineTotal;
            this.orderDetails.push(this._orderDetails);       
            this.currentStock = this.currentStock - qty;
            //this.data = this.orderDetails;
            this.add(this._orderDetails);
            //this.addProductToGrid();
          //  this.onChange(this.sel);         
    }
  }
  
  }
  else{
      alert("Stock out");
  }
  this.orderTotal = this.calculateTotal();
  this.netPay = this.calculateNetTotal();
 }
 
  confirmOrder({ value, valid}: { value: Order,  valid: boolean }) {    
         //  this.order = value;         
         this.order.orderDate = new Date(); 
         this.order.receiveDate = new Date(); 
         
          this.order.status = 'processing';
          
          this.order.orderTotal = this.orderTotal;  
          this.order.netPay = this.netPay;
          this.order.discount = this.discount;          
          this.order.clientAccountID = 3;
          this.order.employeeID = 21; 
       //   console.log(this.order.discount);  
           if(this.cash >= this.netPay){               
              this.payment.amount = this.netPay;
              this.payment.paymentDate = new Date();          
              this.payment.paymentType = this.selectedPayment;
              this.payment.status = 'paid';  
              this.payment.clientAccountID = 3;           
              this.param = { 'customerorder': this.order, 'orderdetails': this.orderDetails,
                           'payment': this.payment,'info':this.info, 'delivery':this.daliveryAddress, 'billingAddress':this.billingAddress};  
              this.saveData(); 
           }    
           else{
              if (this.cash)  
                this.payment.amount = this.cash;        
              else
                this.payment.amount = this.credit;
                this.payment.paymentDate = new Date();  
                this.payment.paymentType = this.selectedPayment;
                this.payment.status = 'pending';   
                this.payment.clientAccountID = 3;            
                this.param = { 'customerorder': this.order, 'orderdetails': this.orderDetails, 
                              'payment': this.payment,'info':this.info,'delivery':this.daliveryAddress,'billingAddress':this.billingAddress}; 
                this.saveData();
           }             
  }
  saveData(){      
   // let body = JSON.stringify(this.param);
    console.log(this.param); 
    this.service.addOrder(this.param)                    
                      .subscribe(
                        (val) => {
                            this.placedOrder = val;
                            console.log(this.placedOrder);
                            alert("Order Saved.")
                        },
                        response => {
                          alert("Error" + response)                              
                        },
                        () => {
                            console.log("The POST observable is now completed.");
                        });

    this.goBack();
}
onDeliveryFormSubmit({ value, valid}: { value: DeliveryAddress,  valid: boolean }){
    this.daliveryAddress = value; 
    console.log(this.daliveryAddress);
}
goBack(){
//   this.router.navigate(['/home']);
}
getProductName(id:number){      
    for(var i =0; i< Object.keys(this.products).length; i++){          
          if(Number(this.products[i].itemID)  === Number(id))               
                return this.products[i].name;     
          }       
          return '';
}  
getProductPrice(id:number){      
    for(var i =0; i< Object.keys(this.products).length; i++){        
      if(Number(this.products[i].itemID)  === Number(id))      
            return this.products[i].unitPrice;     
      }       
      return 0;
}  

calculateTotal(){
    var total: number;
    total = 0;
     for (let order of this.cart){
        total = Number(total + order.total);//(order.unitPrice * order.quantity) ;
    }      
    return total;
}

calculateTotalDiscount(){
  var total: number;
  var discountedAmount : number;
  discountedAmount = 0;
  total = 0;
   for (let order of this.cart){
    discountedAmount = (order.total-(order.quantity * order.unitPrice));
    total = total + discountedAmount; 
  }  
  return total;
}

  calculateLineTotal(_price:number, qty:number){        
      this.lineTotal = this.lineTotal + (_price * qty) ;  
      return this.lineTotal;
  }
 
  searchDuplicateProduct(id:number){
        var index = this.cart.indexOf(this.cart.filter(x => x.itemID == id)[0]); 
        if(index !== undefined) return index;    
        else return -1;
  }
  

updateList(id: number, property: string, event: any) {    
    const editField = event.target.textContent;
    var total = 0;
    this.cart[id][property] = editField;
    if (property === 'discount'){
      total = this.cart[id]['unitPrice'] *  this.cart[id]['quantity'];
      total = (total - ((this.cart[id]['quantity'] * this.cart[id]['unitPrice']) * this.cart[id]['discount'])/100);
      this.cart[id]['total'] = total;
      this._orderDetails.discount = this.cart[id][property];
    }
    else if (property === 'quantity'){
      this.cart[id]['total']  = this.cart[id]['unitPrice'] *  this.cart[id]['quantity'];
      this.cart[id]['total'] = (this.cart[id]['total'] - ((this.cart[id]['quantity'] * this.cart[id]['unitPrice']) * this.cart[id]['discount'])/100);
    }

    this.orderTotal = this.calculateTotal(); 
    this.netPay = this.calculateNetTotal();
    this.credit = this.calculateCredit();
  }

  remove(id: any) {
    this.cart.splice(id, 1);
    this.orderTotal = this.calculateTotal();
    this.netPay = this.calculateNetTotal();
    this.credit = this.calculateCredit();
 }

  add(cart : Cart) {
   
   // if (this.awaitingPersonList.length > 0) {
     // const person = this.awaitingPersonList[0];
      this.cart.push(cart);
    //  this.awaitingPersonList.splice(0, 1);
   // }
   console.log(this.cart);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
   // this.orderTotal = this.calculateTotal();
  }
  onKeydown(event){

  }
  
  onDiscount(event){
    alert(event);
  }
  onChangeCash(amount:number){
    this.cash = Number (amount);
    this.credit = this.netPay - this.cash;
  }
  onChangePayment(type:string){
    this.selectedPayment = type; 
  }
  onChangeDiscount(amount: number): void {  
    this.discount = Number(amount);
    this.netPay = this.calculateNetTotal();
    this.credit = this.calculateCredit();
  }
  calculateCredit(){
    return this.netPay - this.cash;
  }
  calculateNetTotal(){
      return this.orderTotal - this.discount;
  }
  addCustomer(){
    alert("Tets");
  }
  print(): void {
    console.log(this.placedOrder);
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

public openPDF2():void {
  let DATA = this.htmlData.nativeElement;
  let doc = new jsPDF('p','pt', 'a4');
  doc.fromHTML(DATA.innerHTML,40,25);
  doc.output('dataurlnewwindow');
}
public openPDF():void {
    const doc = new jsPDF();
    console.log(this.placedOrder['Order']['customerOrderID']);
    doc.text(this.placedOrder['Order']['clientAccountID'], 10, 10);
    doc.text(this.placedOrder['Order']['customerOrderID'], 10, 10);
    
    doc.text(this.placedOrder['Order']['customerOrderID'], 10, 10);
    doc.text(this.placedOrder['Order']['customerOrderID'], 10, 10);
    doc.text(this.placedOrder['Order']['customerOrderID'], 10, 10);
      
    doc.save("a4.pdf"); // will save the file in the current working directory
    
  }
}