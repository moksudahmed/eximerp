import { Subject } from 'rxjs/Subject';

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Witness } from '../purchase/purchase';
import { PurchaseService } from '../services/purchase.service';
@Component({
  selector: 'witness',
  templateUrl: './witness-modal.component.html',
 // styleUrls: ['./pos.component.scss']
})

export class WitnessModalComponent {
   // @Input() total = 3000 ;
    @Output() emitData = new EventEmitter();
    public onClose: Subject<boolean>;
    public event: EventEmitter<any> = new EventEmitter();
    mac: any;
    param: any;
    lastInsertedID : number;
    model: Witness;
    model2: Witness;
    amount: number;
    change: number;
    title: string;
    public orderTotal: any;
    receivedAmount: number;
    constructor(
        public service:PurchaseService) {
        this.model = new Witness();
       // this.lastInsertedID = null;
        this.model2 = new Witness();
    }

    public ngOnInit(): void {
        this.onClose = new Subject();
    }
    
    public onConfirm(): void {
        
        //this.onSubmit();                  
       // console.log('id:',id); 
        this.emitData.emit(11);
        this.onClose.next(true);        
      
    }
    onSubmit(){
        this.param = {'witness': this.model};
       
        let body = JSON.stringify(this.param);
        this.service.addWitness(this.param).subscribe(b => this.model2 = b); 
        
        console.log(this.model2);  
       /*this.service.addWitness(this.param)                    
                    .subscribe(
                      (val) => {                      
                          console.log("POST call successful value returned in body",  
                         this.lastInsertedID = val.personID,    
                                     
                         val);                             
                       
                      },
                      response => {                    
                          console.log("POST call in error", response);
                      },
                      () => {
                          console.log("The POST observable is now completed.");
                      });*/
       
     //  return this.lastInsertedID; 
    }
    public close(): void {
       
     }
  
    public onCancel(): void {
        this.onClose.next(false);
       
    }
}