import { Component, OnInit } from '@angular/core';
import { Item, StockLevel, Stock } from './item';
import { ProductService  } from '../services/product.service';

@Component({
  selector: 'app-stockupdate',
  templateUrl: './stockupdate.component.html',
  //styleUrls: ['./stockupdate.component.scss']
})
export class StockupdateComponent implements OnInit {

  private stock: StockLevel;
  private stockLevel: StockLevel;

  private products: Item[];
  param:any;

  submitted = false;
  constructor(public service:ProductService) { 
   
    this.stock = new StockLevel();
    this.stockLevel = new StockLevel();
  }

  ngOnInit() {    
    this.getProducts();
    this.getStock();
  }
  getStock(){   
    this.service.getStock()
    .subscribe(stock =>{         
      this.stockLevel = stock['stock'];
     })
    }  

 getProducts(): void {  
      this.service.getProduct().subscribe(item => {
      this.products = item['items']; 
    });
  }
  onFormSubmit({ value, valid}: { value: StockLevel, valid: boolean }) {
    this.service.addStock(this.stock)                    
                      .subscribe(
                        (val) => {
                            alert("Stock Updated.")
                        },
                        response => {
                          alert("Error" + response)                              
                        },
                        () => {
                            console.log("The POST observable is now completed.");
                        });

      this.goBack()

  }

  goBack(){    
    
   }
 
}
