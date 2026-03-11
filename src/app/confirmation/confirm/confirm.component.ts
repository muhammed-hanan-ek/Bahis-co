import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { ConfirmationService, ConfirmConfig } from '../confirmation.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {
  config$!: Observable<ConfirmConfig | null>;

  constructor(public confirm: ConfirmationService) {
    this.config$ = this.confirm.dialog$;
  }
}
