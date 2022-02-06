export class PurchaseRequest {
    date: Date;
    status:string;
    purchaseRequestID: number;
    departmentID: number;
    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       this.status ='processing';
    }
}
export class PurchaseRequestCart{    
    purchaseRequestID: number;
    itemID: number;
    name: string;
    quantity: number;
    weight: number;
    unitPrice:number;
    purchaseRequestCartID: number;    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
}

export class Qutation{
    itemID: number;
    quantity: number;
    price: number;
    approved: boolean;    
    qutationID: number;
    purchaseRequestID: number;
    supplierID: number;
    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
        this.approved = false;
       
    }
}

export class Supplier{
    supplierID: number;
    departmentID: number;
    subSidiaryAccountID: number;
    type: string;
    category: string;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
}
export class IndividualSupplier{
    addressLine1: string;​​​
    addressLine2: string;    ​​​
    city: string;    ​​​
    country: string;    ​​​
    departmentID:  number;    ​​​
    emailAddress: string;    ​​​
    gender: string;    ​​​
    id:  number;    ​​​
    mobileNo1: string;    ​​​
    organizationID:  number;    ​​​
    per_name: string;    ​​​
    postcode: string;    ​​​
    subSidiaryAccountID: number;    ​​​
    type: string;
    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
}

export class CorporateSupplier{
    companyName: string;​​​
    contactNo: string;
​​​    contactPersonName: string;​​​
    departmentID: number;​​​
    designation: string;​​​
    emailAddress: string;
​​​    id: number;​​​
    organizationID: number;
​​​    subSidiaryAccountID: number;
​​​    type: string;
​​​    website: string;
    addressLine1:string;
    addressLine2: string;
    postcode: string;
    city: string;
    country: String;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
} 
 
export class Local{
    localID: number;
      constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
}

export class PurchaseOrder{
    date: Date;
    discount: number;
    orderTotal: number;
    shippingDate: Date;
    tax: number;
    vat: number;
    netTotal: number;
    purchaseOrderID: number;
    salesContractID: number;   
    localID: number;
    purchaseRequestID: number;
    qutationID: number;
   
    constructor(values: Object = {}) {
        //Constructor initialization

        Object.assign(this, values);
       
    }
}
export class PurchaseOrderDetails{
    itemID: number;
    quantity: number;
    unitPrice: number;
    weight: number;
    purchaseOrderDetailsID: number;
    purchaseOrderID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    
    }
}
export class LC{    
          date: Date;
          HSCode: string;
          IRCERCNo: string;
          LCAFNo: string;
          LCAFDate: Date;
          LCDate: Date;
          LCNo: string;
          nameOfCarrier: string;
          nationality: string;
          placeOfLoading: string;
          placeOfUnloading: string;
          vatRegistrationNo: string;
          currency: string;
          insuranceCoverNoteNo: string;
          recevingBank: string;
          letterCreditID: number;
          insuranceID: number;
          subSidiaryAccountID: number;
          salesContractID : number;
          constructor(values: Object = {}) {
            //Constructor initialization
            Object.assign(this, values);
    }
}
export class SalesContract{        
    paymentTerms: string;
    isImported: boolean;
    bankName: string;
    contractNo: string;
    date: Date;
    deliveryPeriodFrom: Date;
    deliveryPeriodTo: Date;
    iECNo: string;
    route: string;
    determinationOfMeserment: string;
    modeOfTransport: string;
    paymentMethod: string;
    salesContractID: number;
    witnessID: number;
    internationalID: number;
    purchaseOrderID: number;
    constructor(values: Object = {}) {
      //Constructor initialization
      this.isImported = true;
      Object.assign(this, values);
}
}

export class ContractDetails{
    itemInfo: string;
    quantity: number;
    itemPrice: number;
    contractDetailsID: number;
    salesContractID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
    }
}
export class BillOfEntry{
    date: Date;
    quantity: number;
    registrationNo: string;
    itemInvoiceValue: number;
    totalTaxAmount: number;
    totalAccessableValue: number;
    billOfEntryID: number;
    letterCreditID: number;
    thirdPartyAgendID: number;
    
        constructor(values: Object = {}) {
            //Constructor initialization
            Object.assign(this, values);
        }    
   
      
}
export class Witness{
    title: string; 
    firstName: string; 
    lastName: string; 
    dateOfBirth: Date;
    gender: string; 
    emailAddress: string; 
    mobileNo: string;
    maritalStatus: string;    
    personID: number;
    id: number;
    fathersName: string;
    mothersName: string;
    addressLine1: string; 
    addressLine2: string;
    postcode : string; 
    city: string; 
    country: string; 
    mobileNo1: string; 
    mobileNo2: string;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
   }
   export class _Witness{
     witnessID: number;

    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
   }

   export class ThirdPartAgent{
       
    thirdPartyAgendID: number;
    category: string; 
    proprietor: string; 
    referenceNo: string; 
    remarks: string; 
    tin: string; 
    vatNo: string;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
   }
