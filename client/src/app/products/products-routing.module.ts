import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { CategoryComponent } from './category.component';
import { ProductComponent } from './product.component';
import { StockComponent } from './stock.component';
import { StockupdateComponent } from './stockupdate.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products'
    },
    children: [     
      {
        path: 'products',
        component: ProductsComponent,
        data: {
          title: 'Products'
        }
      }, 
      {
        path: 'product',
        component: ProductComponent,
        data: {
          title: 'Add Product'
        }
      }, 
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Category'
        }
      },
      {
        path: 'stock',
        component: StockComponent,
        data: {
          title: 'Stock'
        }
      },      
      {
        path: 'stockupdate',
        component: StockupdateComponent,
        data: {
          title: 'Stock update'
        }
      },    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
