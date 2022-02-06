import { LC, SalesContract, BillOfEntry, Supplier, PurchaseRequest,  PurchaseOrder, PurchaseOrderDetails, PurchaseRequestCart, Local, Qutation } from '../purchase/purchase';

export class PurchaseFormDataService{

    purchaseOrder : PurchaseOrder;
    addressDetails : PurchaseRequest;
    invoice : any;
    salesContract : SalesContract;  
//    orderDetails:PurchaseOrderDetails;
    orderDetails:PurchaseOrderDetails[];
    constructor() {
        this.purchaseOrder = new PurchaseOrder();
        this.addressDetails = new PurchaseRequest();
        this.salesContract = new SalesContract();
        this.orderDetails = [];
        this.invoice = '';
     }
  
     postData(){
       console.log("I",this.invoice);
       let newCombinedObject = {
         purchaseOrder : this.purchaseOrder, 
         orderDetails  : this.orderDetails,
         salesContract : this.salesContract,
         invoice       : this.invoice,
       }
  
       //Use somthing like http.post etc to send the data to the backend server. 
     }
  }