import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ConfirmConfig {
  title: string;
  message: string;
  type?: 'danger' | 'success' | 'info';
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: 'root'
})


export class ConfirmationService {

  constructor() { }
 
  private dialogSubject = new Subject<ConfirmConfig | null>();
  dialog$ = this.dialogSubject.asObservable();

  private result!: (value: boolean) => void;

  open(config: ConfirmConfig): Promise<boolean> {

    this.dialogSubject.next(config);

    return new Promise(resolve => {
      this.result = resolve;
    });

  }

  confirm() {
    this.result(true);
    this.dialogSubject.next(null);
  }

  cancel() {
    this.result(false);
    this.dialogSubject.next(null);
  }

}
