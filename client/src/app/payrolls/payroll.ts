export class Payroll{  
    approve: Date;
    payDate: Date;
    payFrom: Date;
    payTo: Date;
    prepeareDate: Date;
    status: string;
    tax: number;
    totalGrossPay: number;
    totalNetPay: number;        
    payrollID: number;
    employeeID: number;
    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }        

}
export class HourlySalary{ 
    per_name: string;
    designation: string;
    status: string;
    overtimeRate: number;
    profileType: string;
    providentFund: number;
    taxRate: number;
    hourlyRate: number;
    commissionRate: number;
    paymentType: string;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }        

}
export class CommissionSalary{ 
    per_name: string;
    designation: string;
    status: string;
    overtimeRate: number;
    profileType: string;
    providentFund: number;
    taxRate: number;
    commissionRate: number;
    paymentType: string;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }        

}

export class MonthlySalary{ 
    per_name: string;
    designation: string;
    status: string;
    overtimeRate: number;
    profileType: string;
    providentFund: number;
    taxRate: number;
    hourlyRate: number;
    commissionRate: number;
    paymentType: string;
    basicSalary: number;
    convince: number;
    festivalBonus: number;
    houseRent: number;
    medicalAllowance: number;
    otherAllowance: number;
    grosssalary: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }        

}

export class Wages{ 
    grossIncome: number;
    netIncome: number;
    overtime: number;
    status: string;
    totalCommission: number;
    totalHour: number; 
    salaryProfileID: number;    
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }        

}