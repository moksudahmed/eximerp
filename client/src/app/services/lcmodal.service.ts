import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LCDialogComponent } from '../purchase/lcdialog.component';

@Injectable()
export class LcmodalService {
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
  ) { }

  lcconfirm(title: string, message: string, options: string[]): Observable<string> {
    const initialState = {
      title: title,
      message: message,
      options: options,
      answer: "",
    };
    this.bsModalRef = this.bsModalService.show(LCDialogComponent, { initialState });

    return new Observable<string>(this.getConfirmSubscriber());
  }

  private getConfirmSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
        observer.next(this.bsModalRef.content.answer);
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
