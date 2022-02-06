import { Component } from '@angular/core';

import { MessageService } from '../services/modalwitness.service';


@Component({
  selector: 'app-witness',
  templateUrl: './witness.component.html',
  styleUrls: ['./witness.component.scss']
})
export class WitnessComponent {
  answers: string[] = [];

  constructor(
    private messageService: MessageService,
  ) {
  }

 /* confirm() {
    this.messageService.confirm(
      "Confirmation dialog box",
      "Are you sure you want to proceed?",
      ["Yes", "No"])
      .subscribe((answer) => {
        this.answers.push(answer);
      });
  }*/

}