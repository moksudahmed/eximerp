import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home-modal.component.html',
 // styleUrls: ['./pos.component.scss']
})

export class HomeModalComponent {
   // @Input() total = 3000 ;
    @Output() emitData = new EventEmitter();
    public onClose: Subject<boolean>;
    public event: EventEmitter<any> = new EventEmitter();
    mac: any;
    amount: number;
    change: number;
 //  total = 3000;
    title: string;
    public orderTotal: any;
    receivedAmount: number;
    constructor(private _bsModalRef: BsModalRef) {}

    public ngOnInit(): void {
        this.onClose = new Subject();
    }
    public calculateChange(amountEntered:number): void {  

        this.change = amountEntered - this.orderTotal;       
        this.receivedAmount = amountEntered;
        
    }
    public onConfirm(id:string): void {
       // console.log(id);                       
        this.emitData.emit(this.receivedAmount);
        this.onClose.next(true);        
        this._bsModalRef.hide();
    }

    public onCancel(): void {
        this.mac = 10;
        this.onClose.next(false);
        this._bsModalRef.hide();
    }
}