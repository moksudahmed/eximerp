import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Witness, LC } from '../purchase/purchase';
import { ConfirmDialogComponent } from '../purchase/confirm-dialog.component';
import { LCDialogComponent } from '../purchase/lcdialog.component';

@Injectable()
export class MessageService {
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
  ) { }

  confirm(title: string, message: string, options: string[]): Observable<Witness> {
    const initialState = {
      title: title,
      message: message,
      options: options,
      witness: Witness,
    };
    this.bsModalRef = this.bsModalService.show(ConfirmDialogComponent, { initialState });
   // console.log(this.bsModalRef);
    return new Observable<Witness>(this.getConfirmSubscriber());
  }

  private getConfirmSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
        observer.next(this.bsModalRef.content.witness);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }
  
  
  

  lcconfirm(title: string, message: string, options: string[]): Observable<LC> {
    const initialState = {
      title: title,
      message: message,
      options: options,
      lc: LC,
    };
    this.bsModalRef = this.bsModalService.show(LCDialogComponent, { initialState });

    return new Observable<LC>(this.getLCConfirmSubscriber());
  }

  private getLCConfirmSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
        observer.next(this.bsModalRef.content.lc);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }
}
