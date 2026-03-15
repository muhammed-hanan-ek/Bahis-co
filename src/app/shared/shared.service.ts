import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private Role = new BehaviorSubject<any>(null);
  Role$ = this.Role.asObservable();

  setRole(data:any) {
    this.Role.next(data);
  }

  constructor() { }
}
