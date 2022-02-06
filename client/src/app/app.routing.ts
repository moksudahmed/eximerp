import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { LoginComponent } from './pages/login.component';
import { HomeComponent } from './home/home.component';
import { AuthguardService }  from './services/authguard.service';
import { AuthGuard } from './_auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'organizations',
        loadChildren: './organizations/organizations.module#OrganizationsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'accountings',
        loadChildren: './accountings/accountings.module#AccountingsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'payrolls',
        loadChildren: './payrolls/payrolls.module#PayrollsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'sales',
        loadChildren: './sales/sales.module#SalesModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'purchase',
        loadChildren: './purchase/purchase.module#PurchaseModule',
        canActivate: [AuthGuard]
      },      
      {
        path: 'clients',
        loadChildren: './clients/clients.module#ClientsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'stakeholder',
        loadChildren: './stakeholder/stakeholder.module#StakeholderModule',
        canActivate: [AuthGuard]
      },    
      {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
