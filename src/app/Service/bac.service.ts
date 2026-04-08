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

  addWork(title:any,client:any,desc:any,link:any,slno:any,taggedEmp:any): Observable<any> {
    const formData = new FormData();

    formData.append('title',title);
    formData.append('client',client);
    formData.append('desc',desc);
    formData.append('link',link);
    formData.append('slno',slno);
    formData.append('taggedEmp', JSON.stringify(taggedEmp || []));

    return this.http.post(
    `${ApiUrl}/work/add`,
    formData
  );
  }

  LoadworkReport(emplist: any, status: any, Client: any, date: any): Observable<any> {
  const formData = new FormData();

  formData.append('emplist', JSON.stringify(emplist || []));
  formData.append('status', JSON.stringify(status || []));
  formData.append('Client', JSON.stringify(Client || []));
  formData.append('date', date);

  return this.http.post(`${ApiUrl}/work/List`, formData);
}

  LoadworkPdf(emplist: any, status: any, Client: any, date: any): Observable<any> {
  const formData = new FormData();

  formData.append('emplist', JSON.stringify(emplist || []));
  formData.append('status', JSON.stringify(status || []));
  formData.append('Client', JSON.stringify(Client || []));
  formData.append('date', date);

  return this.http.post(`${ApiUrl}/work/PDF`, formData);
}

  LoadworkExcel(emplist: any, status: any, Client: any, date: any): Observable<any> {
  const formData = new FormData();

  formData.append('emplist', JSON.stringify(emplist || []));
  formData.append('status', JSON.stringify(status || []));
  formData.append('Client', JSON.stringify(Client || []));
  formData.append('date', date);

  return this.http.post(`${ApiUrl}/work/Excel`, formData);
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

  ApproveOrRejectWork(workId:any,DESICION:any,remark:any): Observable<any> {
    const formData = new FormData();

    formData.append('workId',workId);
    formData.append('DESICION',DESICION);
    formData.append('remark',remark);

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
  LoadConvesrion(slno:any): Observable<any> {
    const formData = new FormData();

    formData.append('SLNO',slno);

    return this.http.post(
    `${ApiUrl}/sales/load`,
    formData
  );
  }

  SaveAd(slno:any,ad:any,startDate:any,endDate:any,amount:any,client:any,link:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);
    formData.append('ad',ad);
    formData.append('startDate',startDate);
    formData.append('endDate',endDate);
    formData.append('amount',amount);
    formData.append('client',client);
    formData.append('link',link);

    return this.http.post(
    `${ApiUrl}/ad/add`,
    formData
  );
  }


    LoadAdReport(Client: any, date: any): Observable<any> {
  const formData = new FormData();

  formData.append('Client', JSON.stringify(Client || []));
  formData.append('date', date);

  return this.http.post(`${ApiUrl}/ad/List`, formData);
}
    LoadAdpdf(Client: any, date: any): Observable<any> {
  const formData = new FormData();

  formData.append('Client', JSON.stringify(Client || []));
  formData.append('date', date);

  return this.http.post(`${ApiUrl}/ad/pdf`, formData);
}
    LoadAdExcel(Client: any, date: any): Observable<any> {
  const formData = new FormData();

  formData.append('Client', JSON.stringify(Client || []));
  formData.append('date', date);

  return this.http.post(`${ApiUrl}/ad/excel`, formData);
}

DeleteAD(SLNO:any): Observable<any> {
    const formData = new FormData();

    formData.append('SLNO',SLNO);

    return this.http.post(
    `${ApiUrl}/ad/Delete`,
    formData
  );
  }

  SaveConversion(SLNO:any,AD:any,count:any,amount:any): Observable<any> {
    const formData = new FormData();

    formData.append('SLNO',SLNO);
    formData.append('AD',AD);
    formData.append('count',count);
    formData.append('amount',amount);

    return this.http.post(
    `${ApiUrl}/sales/add`,
    formData
  );
  }

   viewad(slno:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);
   
    return this.http.post(
    `${ApiUrl}/sales/List`,
    formData
  );
  }
   conversionPdf(slno:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);
   
    return this.http.post(
    `${ApiUrl}/sales/pdf`,
    formData
  );
  }
   conversionexcel(slno:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);
   
    return this.http.post(
    `${ApiUrl}/sales/excel`,
    formData
  );
  }

  Deleteconversion(slno:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);

    return this.http.post(
    `${ApiUrl}/sales/Delete`,
    formData
  );
  }

  loadAdminDashboard(): Observable<any> {
    return this.http.post(
    `${ApiUrl}/AdminDashboard`,
    {}
  );
  }
  loadClientDashboard(): Observable<any> {
    return this.http.post(
    `${ApiUrl}/ClientDashboard`,
    {}
  );
  }
  loadStaffDashboard(): Observable<any> {
    return this.http.post(
    `${ApiUrl}/StaffDashboard`,
    {}
  );
  }
  loadNotification(): Observable<any> {
    return this.http.post(
    `${ApiUrl}/user/notifications`,
    {}
  );
  }

   notificationMarkAsRead(type:any): Observable<any> {
    const formData = new FormData();

    formData.append('type',type);

    return this.http.post(
    `${ApiUrl}/user/notificationMarkAsRead`,
    formData
  );
  }
   notificationMarkALLAsRead(): Observable<any> {
    const formData = new FormData();

    return this.http.post(
    `${ApiUrl}/user/notificationMarkALLAsRead`,
    formData
  );
  }

  LoadcreateEditWorkCalendar(slno:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);

    return this.http.post(
    `${ApiUrl}/work_calendar/load`,
    formData
  );
  }

  addWorkCalendar(slno:any,title:any,content:any,client:any,date:any): Observable<any> {
    const formData = new FormData();

    formData.append('slno',slno);
    formData.append('title',title);
    formData.append('content',content);
    formData.append('client',client);
    formData.append('date',date);

    return this.http.post(
    `${ApiUrl}/work_calendar/add`,
    formData
  );
  }

  calendarlist(status: any, Client: any, date: any): Observable<any> {
  const formData = new FormData();

  formData.append('status', JSON.stringify(status || []));
  formData.append('Client', JSON.stringify(Client || []));
  formData.append('date', date);

  return this.http.post(`${ApiUrl}/work_calendar/list`, formData);
}

}
