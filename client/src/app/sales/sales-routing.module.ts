import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales.component';
import { PosComponent } from './pos.component';
import { OrdersComponent } from './orders.component';
import { OrderdetailsComponent } from './orderdetails.component';
import { PaymentComponent } from './payment.component';
import { ClientComponent } from './client.component';
import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sales'
    },
    children: [     
      {
        path: 'sales',
        component: SalesComponent,
        data: {
          title: 'Sales'
        }
      },
      {
        path: 'pos',
        component: PosComponent,
        data: {
          title: 'POS'
        }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: {
          title: 'Orders'
        }
      },
      {
        path: 'orderdetails/:id',
        component: OrderdetailsComponent,
        data: {
          title: 'Orders'
        }
      },
      {
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'Payment'
        }
      },
      {
        path: 'client',
        component: ClientComponent,
        data: {
          title: 'Client'
        }
      },
      {
        path: 'invoice/:orderId',
        component: InvoiceComponent,
        data: {
          title: 'Invoice'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
