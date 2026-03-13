import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../app.contsant';

@Injectable({
  providedIn: 'root',
})
export class BACService {
  constructor(private http: HttpClient) {}

  userLogin(username:string,password:string): Observable<any> {
    const formData = new FormData();

    formData.append('username',username);
    formData.append('password',password);

    return this.http.post(
    `${ApiUrl}/user/login`,
    formData
  );
  }
}
