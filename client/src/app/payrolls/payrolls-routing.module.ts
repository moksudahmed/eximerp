import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { SalaryprofileComponent } from './salaryprofile.component';
import { EmployeelistComponent } from './employeelist.component';
import { ShowComponent } from './show.component';
import { PayrollComponent } from './payroll.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Payrolls'
    },
    children: [     
      {
        path: 'employee',
        component: EmployeeComponent,
        data: {
          title: 'Employee'
        }
      },
      {
        path: 'salaryprofile',
        component: SalaryprofileComponent,
        data: {
          title: 'Salary Profile'
        }
      },
      {
        path: 'employeelist',
        component: EmployeelistComponent,
        data: {
          title: 'Employee List'
        }
      },
      {
        path: 'show/:id',
        component: ShowComponent,
        data: {
          title: 'Show'
        }
      },
      {
        path: 'payroll',
        component: PayrollComponent,
        data: {
          title: 'Payroll'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollsRoutingModule {}
