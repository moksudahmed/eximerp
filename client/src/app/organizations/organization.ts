export class Organization{  
    organizationName: string;
    address: string;
    city: string;
    contactNo: string;
    emailAddress: string;
    logo: string;
    organizationID: number;
    country: string;
    postalcode: string;
    vat:string;
    tinNo:string;
    licenceNo: string;
    startedAt: Date;
    closedAt: Date;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);                    
    } 
}

export class Profile{  
  organizationName: string;
  address: string;
  city: string;
  contactNo: string;
  emailAddress: string;
  logo: string;
  organizationID: number;
  country: string;
  constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);                    
  } 
}

export class Partners{
      organizationID: number;
      organizationName: string;
      ownerID: number;
      per_name: string;
      mobileNo: string;
      designation: string;
      ownerpercentage: number;
      IRCLicenseNo: string;
      TradeLicenseNo: string;
      LicenseExpireDate: string;
      clientType: string;
      addressLine1: string;
      addressLine2: string;
      postcode: string;
      city: string;
      country: string;

  constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);                    
  } 
}

export class Branch{     
    branchAddress: string;
    branchName: string;
    contactNo: string;
    emailAddress: string;
    branchID: number;
    organizationID: number;
    employeeID: number;
    city: string;
    country: string;
       
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);                    
      //  this.employeeID = 1;
      //  this.organizationID = 1;
    } 
  }
  export class Department{     
    contactNo: string;
    departmentName: string;
    location: string;
    emailAddress: string;
    branchID: number;
    departmentID: number;
    organizationID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);     
      //  this.organizationID = 1;     
     //   this.branchID = 1;                      
    } 
  }
  export class Factory{     
    factoryAddress: string;
    factoryName: string;
    contactNo: string;
    emailAddress: string;
    factoryID: number;
    employeeID: number;
    warehouseID: number;
    organizationID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);                    
     //   this.organizationID = 1;
      //  this.employeeID = 3;
    } 
  }

  export class Warehouse{     
    contactNo: string;
    location: string;
    name: string;
    factoryID: number;
    inventoryDate: Date;
    warehouseID: number;
    deliveryID: number;
    branchID:number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);  
        //this.factoryID = 1;                  
    } 
  }