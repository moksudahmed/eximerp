import { Component, Output, EventEmitter, OnInit,  Input} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';
import { Witness } from '../purchase/purchase';
import { PurchaseService } from '../services/purchase.service';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  options: string[];
  witness: Witness;//  = "";

  public onClose: Subject<boolean>;
  public event: EventEmitter<any> = new EventEmitter();
 
  param: any;
 
  model: Witness;
 

  constructor(
    public bsModalRef: BsModalRef, public service:PurchaseService
  ) { 
    this.model = new Witness();
        
  }

  respond() {
  //  this.onSubmit();
    this.witness = this.model;
    this.bsModalRef.hide();
  }
  public onConfirm(): void {
    
    //this.onSubmit();                  
   // console.log('id:',id); 
//    this.emitData.emit(11);
  //  this.onClose.next(true);        
  this.bsModalRef.hide();
}
public close(): void {
  this.bsModalRef.hide();
}

public onCancel(): void {
  
   this.bsModalRef.hide();
}
onSubmit(){
  this.param = {'witness': this.model};
 
  let body = JSON.stringify(this.param);
  this.service.addWitness(this.param).subscribe(b => this.model = b); 
  
  console.log(this.model);
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
}
