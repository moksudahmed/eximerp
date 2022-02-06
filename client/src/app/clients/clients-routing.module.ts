import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { AddclientComponent } from '../clients/addclient.component';
import { CustomerComponent } from '../clients/customer.component';
import { SupplierComponent } from '../clients/supplier.component';
import { IndividualSupplierComponent } from '../clients/individualsupplier.component';
import { ClientAccountComponent } from './clientaccount.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Stackholders'
    },
    children: [     
      {
        path: 'customer',
        component: CustomerComponent,
        data: {
          title: 'Customer'
        }
      },
      {
        path: 'client-account',
        component: ClientAccountComponent,
        data: {
          title: 'Client Account'
        }
      },
      {
        path: 'addclients',
        component: AddclientComponent,
        data: {
          title: ' Add Clients'
        }
      },
      {
        path: 'corporate-supplier',
        component: SupplierComponent,
        data: {
          title: 'Corporate Supplier'
        }
      },
      {
        path: 'individual-supplier',
        component: IndividualSupplierComponent,
        data: {
          title: 'Individual Supplier'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
