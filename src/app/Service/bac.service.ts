import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../app.contsant';

@Injectable({
  providedIn: 'root',
})
export class BACService {
  constructor(private http: HttpClient) {}

  LoadMenu(): Observable<any> {
    return this.http.post(
    `${ApiUrl}/user/loadMenu`,
    {}
  );
  }

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

  LoadEditUSer(UserId:any): Observable<any> {
    const formData = new FormData();

    formData.append('UserId',UserId);
    
    return this.http.post(
    `${ApiUrl}/user/Load`,
    formData
  );
  }
  DeleteUser(UserId:any): Observable<any> {
    const formData = new FormData();

    formData.append('UserId',UserId);

    return this.http.post(
    `${ApiUrl}/user/Delete`,
    formData
  );
  }


   addUser(username:any,password:any,role:any,email:any,Fullname:any,userID:any,img_name:any,img_File:any): Observable<any> {
    const formData = new FormData();

    formData.append('username',username);
    formData.append('password',password);
    formData.append('role',role);
    formData.append('email',email);
    formData.append('Fullname',Fullname);
    formData.append('userID',userID);
    formData.append('img',img_name);
    formData.append('File',img_File);

    return this.http.post(
    `${ApiUrl}/user/add`,
    formData
  );
  }

  addWork(title:any,client:any,desc:any,link:any,slno:any): Observable<any> {
    const formData = new FormData();

    formData.append('title',title);
    formData.append('client',client);
    formData.append('desc',desc);
    formData.append('link',link);
    formData.append('slno',slno);

    return this.http.post(
    `${ApiUrl}/work/add`,
    formData
  );
  }

  LoadworkReport(): Observable<any> {

    return this.http.post(
    `${ApiUrl}/work/List`,
    {}
  );
  }

  LoadEditWork(slno:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);
    
    return this.http.post(
    `${ApiUrl}/work/load`,
    formData
  );
  }


  DeleteWork(workId:any): Observable<any> {
    const formData = new FormData();

    formData.append('workId',workId);

    return this.http.post(
    `${ApiUrl}/work/Delete`,
    formData
  );
  }

  ApproveOrRejectWork(workId:any,DESICION:any): Observable<any> {
    const formData = new FormData();

    formData.append('workId',workId);
    formData.append('DESICION',DESICION);

    return this.http.post(
    `${ApiUrl}/work/ApproveOrReject`,
    formData
  );
  }

  LoadAd(slno:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);

    return this.http.post(
    `${ApiUrl}/ad/load`,
    formData
  );
  }

  SaveAd(slno:any,ad:any,startDate:any,endDate:any,amount:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);
    formData.append('ad',ad);
    formData.append('startDate',startDate);
    formData.append('endDate',endDate);
    formData.append('amount',amount);

    return this.http.post(
    `${ApiUrl}/ad/add`,
    formData
  );
  }

}
