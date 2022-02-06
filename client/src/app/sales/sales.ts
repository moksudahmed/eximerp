export class Info{
    branch : number;
    organization: number;
    financialYearId:number;
    userID:number
    
    constructor(values: Object = {}) {
        //Constructor initialization
        this.branch  = 1; // Number(localStorage.getItem('branchID'));
        this.organization = Number(localStorage.getItem('orgnizationID'));      
        this.financialYearId = 1;
        this.userID = 1;        
        Object.assign(this, values);            
    }     
}

export class Customer{
    clientAccountID: number;
    accountName:string;
    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }     
}
export class Product{
    id: number;
    name: string;
    price: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }     
}
export class Order{
    discount: number;
    orderDate:Date;
    receiveDate: Date;    
    status: string;
    orderTotal: number;     
    netPay: number;
    clientAccountID: number;
    employeeID: number; 
    customerOrderID: number;       
    constructor(values: Object = {}) {
        //Constructor initialization
        this.orderDate = new Date(); 
        Object.assign(this, values);            
    }     
}

export class OrderDetails{
    id: number;
    itemID: number;
    name: string;
    quantity: number;
    unitPrice: number;
    discount:number;
    total: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }     
}

export class Items{    
    maxOrderQuantity:number;
    name: string;
    description: string;
    unitPrice: number;
    itemID: number;
    itemType: string;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }     
}

export class Payment{        
    amount: number;
    paymentDate: Date;
    paymentType: string;
    status: string;   
    clientAccountID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }    
}


export class DeliveryAddress{        
    deliveryAddressID:number;
    addressLine1:string;
    addressLine2: string;
    city: string;
    name: string;
    postcode: string;
    mobileNo:string;
    vehicleNo:string;
    customerOrderID:number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }    
}
export class BillingAddress{
    billingAddressID:number;
    addressLine1:string;
    addressLine2:string;
    city:string;
    country:string;
    name:string;
    postcode:string;
    contactNo:string;
    customerOrderID:number;

    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }     
}


export class PaymentDue{
    accountNo: number;
    due: number;      
}