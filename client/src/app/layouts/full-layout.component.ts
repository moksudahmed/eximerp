import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { Organization } from '../organizations/organization';
import { OrganizationService  } from '../services/organization.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  private organization : Observable<Organization[]>;  
 
  user: string
  branch: string;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  selectedProfile:number;
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  constructor(private auth: AuthService,
              public service:OrganizationService, 
              private router: Router) 
  { 
    if (localStorage.getItem('currentUser')) {
      this.user = localStorage.getItem('currentUser');
      
  }

    this.onInitialSettings();
    
    if (localStorage.getItem('branchName')) {
      this.branch = localStorage.getItem('branchName');
      console.log(this.branch);
    }
    this.getOrganization(); 
    
  }

  getOrganization(){
    this.service.getOrganization().subscribe(organizations => {
     this.organization = organizations['organizations'];
     console.log('Test',this.organization);
   });
   }

  onInitialSettings() {
    // console.log("Test");
       this.submitted = true;

       // stop here if form is invalid
       

       this.loading = true;
       this.auth.initialSettings(this.user)
           .pipe(first())
           .subscribe(
               data => {
                   console.log(data)
               },
               error => {
                   this.error = error;
                   this.loading = false;
               });
   }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {}
}
