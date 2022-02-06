import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import { PurchaserequestComponent } from './purchaserequest.component';
import { QutationComponent } from './qutation.component';
import { PurchaseorderComponent } from './purchaseorder.component';
import { LCComponent } from './lc.component';
import { SalescontractComponent } from './salescontract.component';
import { BillofentryComponent } from './billofentry.component';
import { GenerateorderComponent } from './generateorder.component';
import { WitnessComponent } from '../purchase/witness.component';
import { SupplierPaymentComponent } from '../purchase/supplier-payment.component';
import { OrderComponent } from '../purchase/order.component';
import { PreviewComponent } from '../purchase/preview.component';
import { InvoiceComponent } from '../purchase/invoice.component';
import { OrderDetailsComponent } from '../purchase/orderdetails.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Purchase'
    },
    children: [     
      {
        path: 'purchase',
        component: PurchaseComponent,
        data: {
          title: 'Purchase'
        }
      },
      {
        path: 'generateorder',
        component: GenerateorderComponent,
        data: {
          title: 'Generate Order'
        }
      },
      {
        path: 'order',
        component: OrderComponent,
        data: {
          title: 'Order'
        }
      },
      {
        path: 'preview',
        component: PreviewComponent,
        data: {
          title: 'Preview'
        }
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
        data: {
          title: 'Invoice'
        }
      },
      {
        path: 'invoice/:purchaseOrderID',
        component: InvoiceComponent,
        data: {
          title: 'Invoice'
        }
      },
     
      {
        path: 'witness',
        component: WitnessComponent,
        data: {
          title: 'Witness'
        }
      },
      {
        path: 'purchaserequest',
        component: PurchaserequestComponent,
        data: {
          title: 'Purchase Request'
        }
      }, 
      {
        path: 'qutation',
        component: QutationComponent,
        data: {
          title: 'Qutation'
        }
      }, 
      {
        path: 'purchaseorder',
        component: PurchaseorderComponent,
        data: {
          title: 'Purchase Order'
        }
      }, 
      {
        path: 'order-details/:purchaseOrderID',
        component: OrderDetailsComponent,
        data: {
          title: 'Order Details'
        }
      },
      {
        path: 'lc',
        component: LCComponent,
        data: {
          title: 'LC'
        }
      }, 
       
      {
        path: 'lc/:purchaseRequestID',
        component: LCComponent,
        data: {
          title: 'LC'
        }
      }, 
      //{path:'edit/:id', component:EditComponent},
      {
        path: 'salescontract',
        component: SalescontractComponent,
        data: {
          title: 'Sales Contract'
        }
      },  
      {
        path: 'billofentry',
        component: BillofentryComponent,
        data: {
          title: 'Bill Of Entry'
        }
      }, 
      {
        path: 'supplier-payment',
        component: SupplierPaymentComponent,
        data: {
          title: 'Supplier Payment'
        }
      },    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule {}
