export class Client{  
    clientType: string;
    date: Date;
    clientID: number;
    organizationID: number;
    subSidiaryAccountID: number;    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
        this.organizationID = 1;
        this.subSidiaryAccountID = 1;
        this.date = new Date();
    } 
}
export class Owner{  
    
        designation: string;
        ownerID: number;
        IRCLicenseNo: string;
        TradeLicenseNo: string;
        LicenseExpireDate: Date;
        clientID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    } 
}

export class Partnership{
    organizationID: number;
    ownerID: number;
    ownerPercentage: Number;
    condition: string;
    constructor(values: Object = {}) {
    //Constructor initialization
    Object.assign(this, values);            
} 
}
export class ClientAccounts{    
    accountName: string;
    accountNo: string;
    joiningDate: Date;
    active: boolean;
    suspended: boolean;
    accountCreditLimit: number;
    remarks: string;
    clientAccountID: number;
    clientID: number;
    //organizationID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);  
        this.joiningDate = new Date();
        this.active = true;
        this.suspended = false;          
    } 
}
export class Customer{
      id: number;
      accountName: string;
      accountNo: string;
      joiningDate: Date;
      active: boolean;
      suspended: boolean;
      accountCreditLimit: number;
      remarks: string;
      clientAccountID: number;
      organizationID: number;
      date: Date;
      subSidiaryAccountID: number;   
     constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
       
    } 
}
export class IndividualCustomer{
      id: number;
      date: Date;
      title: string;
      firstName: string;
      lastName:string;
      dateOfBirth:Date;
      gender: string;
      emailAddress: string;
      mobileNo:string;
      maritalStatus: string;
      addressLine1:string;
      addressLine2:string;
      postcode:string;
      city: string;
      country: string;   
   constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);            
     
  } 
}

export class CorporateCustomer{
    id: number;
    date: Date;
    companyName: string;
    contactPersonName: string;
    designation:string;
    contactNo:Date;
    emailAddress: string;
    website:string;
    addressLine1:string;
    addressLine2:string;
    postcode:string;
    city: string;
    country: string;   
 constructor(values: Object = {}) {
    //Constructor initialization
    Object.assign(this, values);            
   
} 
}

export class Person{
    title: string; 
    firstName: string; 
    lastName: string; 
    dateOfBirth: Date;
    gender: string; 
    maritalStatus: string;    
    personID: number;
    clientID: number;
    fathersName: string; 
    mothersName: string;

    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
}
  export class Company{
    companyName: string;
    contactPersonName: string;
    designation: string;
    contactNo: string;
    emailAddress: string;
    website: string;
    companyID: string;
    clientID: number;
        constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
    }
}


   export class ContactInfo{
    addressLine1: string;
    addressLine2: string;
    postcode: string;
    city: string;
    country: string;
    contactID: number;
    clientID: number;
    emailAddress: string;
    mobileNo1: string;
    mobileNo2: string;
      constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
    }
}
