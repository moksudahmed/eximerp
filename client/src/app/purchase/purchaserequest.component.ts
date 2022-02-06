import { Component, OnInit } from '@angular/core';
import { PurchaseRequest, PurchaseRequestCart } from '../purchase/purchase';
import { Department } from '../organizations/organization';
import { Item } from '../products/item';
import { PurchaseService } from '../services/purchase.service';
import { OrganizationService } from '../services/organization.service';
import { ProductService  } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-purcheaserequest',
  templateUrl: './purchaserequest.component.html',
  styleUrls: ['./purchaserequest.component.scss']
})
export class PurchaserequestComponent implements OnInit {
  
  selectedPersonId : Item;
  selectItem : Item;
  selectedSimpleItem = 'Two';

  productList: Array<PurchaseRequestCart> = [];

  private model: PurchaseRequest;
   
  private loading: boolean = false;
  //private model2: PurchaseRequest;  
  submitted = false;
  param: any;
  selectedItem: any;
  private departments : Department;
 // private items : Item;  
  temp: PurchaseRequestCart;
  private department : Observable<Department[]>;  
  private item: Item[];  
  items: Array<Item> = [];
  editField: string;

  
  constructor(public service:PurchaseService,
              public oservice:OrganizationService,
              public pservice:ProductService ) { 
    this.model = new PurchaseRequest();
  
    this.selectedItem = null;
    this.selectItem = new Item();
    this.departments = new Department();
  
    this.selectedPersonId = new Item();
    this.temp = new PurchaseRequestCart();
  }

  ngOnInit() {
  //  this.getRequest();
    this.getDepartment();
    this.getProduct();
  }
  getDepartment(){    
  //  this.department = this.oservice.getDepartment();   
    this.oservice.getAllDepartment()
    .then((profile) =>{
      this.departments = profile['departments'];
    })
    .catch(error => console.log(error));
    
 }

getProduct(){ 
    
    this.pservice.getItem()
    .then((profile) =>{
      this.items = profile['item']; 
    })
    .catch(error => console.log(error));  
  }  
  
onFormSubmit({ value, valid}: { value: PurchaseRequest, valid: boolean }) {
      this.submitted = true;

    this.param = {'purchaserequest': this.model, 'cart': this.productList};
   
    let body = JSON.stringify(this.param);
  
    this.service.addPurchaseRequest(this.param)                    
                      .subscribe(
                        (val) => {
                          alert("New Purchase Request successfuly created.");
                        },
                        response => {
                          alert("Error" + response)                              
                        },
                        () => {
                            console.log("The POST observable is now completed.");
                        });
      this.goBack(); 
  }

  getRequest(){  
   // this.model2 = this.service.getPurchaseRequest();   
 }

  goBack(){    
    this.getRequest();
   }
     

   onChange(dept): void {
   
    this.model.departmentID = Number(dept);    
   }
  
    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.productList[id][property] = editField;
    }

    remove(id: any) {
      this.productList.splice(id, 1);
    }

    
    add(qty:number, weight:number, unitPrice:number) {
      var x : PurchaseRequestCart;
      x = new PurchaseRequestCart();
      let index = this.searchDuplicateProduct(Number(this.selectedPersonId));            
    
      if(index > -1 ) 
      {
            this.productList[index].quantity = Number(this.productList[index].quantity) + Number(qty);
            this.productList[index].weight = Number(this.productList[index].weight) + Number(weight);
      }
      else{
          this.pservice.getItem()      
          .then((profile) =>{
            this.item = profile['item'];
            this.selectItem = this.item.filter(x => x.itemID == Number(this.selectedPersonId))[0];
            x.itemID = this.selectItem.itemID;
            x.name = this.selectItem.name;
            x.quantity = qty;
            x.unitPrice = this.selectItem.unitPrice;
            x.weight = weight;        
            this.productList.push(x);
          })
          .catch(error => console.log(error));
      }
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

    doSearch(term: string) {
      this.loading = true;
      this.pservice.search(term).then(_ => (this.loading = false));
    }
  
    searchDuplicateProduct(id:number){
      var index = this.productList.indexOf(this.productList.filter(x => x.itemID == id)[0]); 
      if(index !== undefined) return index;    
      else return -1;
    }

}

