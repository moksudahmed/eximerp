import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
// Modal Component
import { EmployeeService  } from '../services/employee.service';
import { PersonService  } from '../services/person.service';
import { PayrollService  } from '../services/payroll.service';
import { SalaryProfileService } from '../services/salaryprofile.service';
import { HttpModule, Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PayrollsRoutingModule } from './payrolls-routing.module';
import { EmployeeComponent } from './employee.component';
import { SalaryprofileComponent } from './salaryprofile.component';
import { EmployeelistComponent } from './employeelist.component';
import { ShowComponent } from './show.component';
import { PayrollComponent } from './payroll.component';
import { ChartofaccountsService  } from '../services/chartofaccounts.service';

@NgModule({
  imports: [
    PayrollsRoutingModule,  
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule
  ],
  declarations: [  
    EmployeeComponent, SalaryprofileComponent, EmployeelistComponent, ShowComponent, PayrollComponent
  ],
  providers: [    
    EmployeeService,
    PersonService,
    PayrollService,
    SalaryProfileService,
    ChartofaccountsService
  //  JournalService,    
  ],
  
})
export class PayrollsModule { }
