export class Employee {
    joningDate: Date;
    leavingDate: Date;
    status: string;
    designation: string;
    employeeID: number;
    warehouseID: number;
    departmentID: number;
    branchID: number;
    factoryID: number;
    organizationID: number;    
    constructor(values: Object = {}){
         //Constructor initialization
         Object.assign(this, values);
         this.status = 'working';
         this.branchID = 1;
         this.organizationID = 1;
     }
    
   }
   export class Person{
    title: string; 
    firstName: string; 
    lastName: string; 
    dateOfBirth: Date;
    gender: string; 
    emailAddress: string; 
    mobileNo: string;
    maritalStatus: string;    
    personID: number;

    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
       
    }
   }
   export class VWEmployee {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    designation:string;
    mobileNo: string;
    emailAddress: string;
    maritalStatus:string;
    status: string;
    joningDate: Date;
    leavingDate: Date;
    warehouseID: number;
    departmentID: number;
    branchID: number;
    factoryID: number;
    organizationID: number;   
    constructor(values: Object = {}){
         //Constructor initialization
         Object.assign(this, values);
         
     }
    
   }

   export class Address{
    addressLine1: string;
    addressLine2: string;
    postcode: string;
    city: string;
    country: string;
    addressID: number;
    clientID: number;
      constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
    }
}

export class Client{
    clientType: string;
    date: Date;
    clientAccountID: number;
    clientID: number;
    organizationID: number;
    subSidiaryAccountID: number;
    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);
        this.clientType = 'employee';
        this.date =  new Date();   
    }
}

    export class AcademicHistory{       
        degreeName: string;
        institutionName: string;
        awardingBody: string;
        passingYear: number;
        result: string;
        academicHistoryID: number;
        personID: number;
    
        constructor(values: Object = {}) {
            //Constructor initialization
            Object.assign(this, values);            
        }    

}

export class EmploymentHistory{    
    designation: string;
    organizationName: string;
    address: string;
    joiningDate: Date;
    leavingDate: Date;    
    employmentHistoryID: number;
    personID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }    

}
export class SalaryProfile{    
    
    overtimeRate: number; 
    profileType: string;
    providentFund: number;
    taxRate: number;
    paymentType: string;
    hourlyRate: number;
    commissionRate: number;
    salaryProfileID: number;
    employeeID: number;
    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }
}
    export class Monthly{            
        basicSalary: number;
        convince: number;
        festivalBonus: number;
        houseRent: number;
        medicalAllowance: number;
        otherAllowance: number;
        increment: number;
        monthlyID: number;        
        constructor(values: Object = {}) {
            //Constructor initialization
            Object.assign(this, values);            
        }        

}
