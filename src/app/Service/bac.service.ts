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


  LoadUserList(): Observable<any> {
    return this.http.post(
    `${ApiUrl}/user/list`,
    {}
  );
  }


   addUser(username:any,password:any,role:any,email:any,Fullname:any): Observable<any> {
    const formData = new FormData();

    formData.append('username',username);
    formData.append('password',password);
    formData.append('role',role);
    formData.append('email',email);
    formData.append('Fullname',Fullname);

    return this.http.post(
    `${ApiUrl}/user/add`,
    formData
  );
  }

  addWork(title:any,client:any,desc:any,link:any): Observable<any> {
    const formData = new FormData();

    formData.append('title',title);
    formData.append('client',client);
    formData.append('desc',desc);
    formData.append('link',link);

    return this.http.post(
    `${ApiUrl}/work/add`,
    formData
  );
  }


}
