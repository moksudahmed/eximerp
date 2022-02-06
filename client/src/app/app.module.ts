import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap";
import { NAV_DROPDOWN_DIRECTIVES } from "./shared/nav-dropdown.directive";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { SIDEBAR_TOGGLE_DIRECTIVES } from "./shared/sidebar.directive";
import { AsideToggleDirective } from "./shared/aside.directive";
import { BreadcrumbsComponent } from "./shared/breadcrumb.component";

// Routing Module
import { AppRoutingModule } from "./app.routing";

// Layouts
import { FullLayoutComponent } from "./layouts/full-layout.component";
import { SimpleLayoutComponent } from "./layouts/simple-layout.component";
import { FormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ModalModule } from "ngx-bootstrap/modal";
//import { HomeModalComponent } from './sales/home-modal.component';
import { LoginComponent } from "./pages/login.component";
import { HomeComponent } from "./home/home.component";
////import { WitnessModalComponent } from './purchase/witness-modal.component';
//import { ClientsComponent } from './clients/clients.component';
//import { ProductsComponent } from './products/products.component';
//import { SalesComponent } from './sales/sales.component';
//import { PayrollsComponent } from './payrolls/payrolls.component';
import { PagesModule } from "./pages/pages.module";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./_auth/auth.guard";
import { TransactionListComponent } from "./transaction-list/transaction-list.component";
import { OrganizationService } from "./services/organization.service";
import { DatePipe } from "@angular/common";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
   // BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    PagesModule,
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:3000"],
        blacklistedRoutes: ["localhost:3000"],
      },
    }),
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    //HomeModalComponent,
    //WitnessModalComponent,
    //  LoginComponent,
    HomeComponent,
    TransactionListComponent,
    //ClientsComponent,
    //ProductsComponent
    //  SalesComponent,
    //PayrollsComponent
    //PayrollComponent,
  ],

  entryComponents: [
    LoginComponent,
    // HomeModalComponent,
    // WitnessModalComponent
  ],

  providers: [
    AuthService,
    OrganizationService,
    DatePipe,
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
