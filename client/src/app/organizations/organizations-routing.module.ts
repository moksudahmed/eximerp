import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationComponent } from './organization.component';
import { BranchComponent } from './branch.component';
import { DepartmentComponent } from './department.component';
import { FactoryComponent } from './factory.component';
import { WarehouseComponent } from './warehouse.component';
import { BranchdetailsComponent } from './branchdetails.component';
import { FactorydetailsComponent } from './factorydetails.component';
import { WarehousedetailsComponent } from './warehousedetails.component';
import { DepatmentdetailsComponent } from './depatmentdetails.component';
import { ProfileComponent } from './profile.component';
import { CreateProfileComponent } from './create-profile.component';
import { CreatePartnerComponent } from './create-partner.component';
import { AddPartnerComponent } from './add-partner.component';
import { ProfileStep1Component } from './profile-step1.component';
import { ProfileStep2Component } from './profile-step2.component';
import { ProfileStep4Component } from './profile-step4.component';
import { PreviewComponent } from './preview.component';
import { ProfileStep3Component } from './profile-step3.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Organizations'
    },
    children: [          
      {
        path: 'organizations',
        component: OrganizationsComponent,
        data: {
          title: 'Organizations'
        }
      },  
      {
        path: 'create-profile',
        component: CreateProfileComponent,
        data: {
          title: 'Create Profile'
        }
      },      
      {
        path: 'profile-step1',
        component: ProfileStep1Component,
        data: {
          title: 'Setup a Business Step 1'
        }
      },
      {
        path: 'profile-step2',
        component: ProfileStep2Component,
        data: {
          title: 'Setup a Business Step 2'
        }
      },
      {
        path: 'profile-step3',
        component: ProfileStep3Component,
        data: {
          title: 'Setup a Business Step 3'
        }
      },    
      {
        path: 'profile-step4',
        component: ProfileStep4Component,
        data: {
          title: 'Setup a Business Step 4'
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
        path: 'create-partner',
        component: CreatePartnerComponent,
        data: {
          title: 'Create Partner'
        }
      },  
      {
        path: 'add-partner',
        component: AddPartnerComponent,
        data: {
          title: 'Add Partner'
        }
      },  
      
      {
        path: 'organization',
        component: OrganizationComponent,
        data: {
          title: 'Organization'
        }
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'branch',
        component: BranchComponent,
        data: {
          title: 'Branch'
        }
      },
      {
        path: 'department',
        component: DepartmentComponent,
        data: {
          title: 'Department'
        }
      },
      {
        path: 'factory',
        component: FactoryComponent,
        data: {
          title: 'Factory'
        }
      },
      {
        path: 'warehouse',
        component: WarehouseComponent,
        data: {
          title: 'Warehouse'
        }
      },
     {
        path: 'branchdetails/:id',
        component: BranchdetailsComponent,
        data: {
          title: 'Branchdetails'
        }
      },      
      
      {
        path: 'factorydetails/:id',
        component: FactorydetailsComponent,
        data: {
          title: 'Factorydetails'
        }
      },
      
      {
        path: 'warehousedetails/:id',
        component: WarehousedetailsComponent,
        data: {
          title: 'Warehousedetails'
        }
      },

      {
        path: 'depatmentdetails/:id',
        component: DepatmentdetailsComponent,
        data: {
          title: 'Depatmentdetails'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {}
