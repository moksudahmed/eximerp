import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { StakeholderComponent } from './stakeholder.component';
import { CustomerComponent } from './customer.component';
import { PartnerComponent } from './partner.component';
import { ThirdPartyComponent } from './third-party.component';
import { SupplierComponent } from './supplier.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Stakeholder'
    },
    children: [     
     
      {
        path: 'stakeholder',
        component: StakeholderComponent,
        data: {
          title: 'Stakeholder'
        }
      },
      {
        path: 'customer',
        component: CustomerComponent,
        data: {
          title: 'Customer'
        }
      },         
      {
        path: 'supplier',
        component: SupplierComponent,
        data: {
          title: 'Supplier'
        }
      },
      {
        path: 'partner',
        component: PartnerComponent,
        data: {
          title: 'Partner'
        }
      },
      {
        path: 'thirdparty',
        component: ThirdPartyComponent,
        data: {
          title: 'Third Party'
        }
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []

})

export class StakeholderRoutingModule { }
