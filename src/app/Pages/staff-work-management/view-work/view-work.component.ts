import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BACService } from '../../../Service/bac.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../loader/loader.service';
import { ConfirmationService } from '../../../confirmation/confirmation.service';

@Component({
  selector: 'app-view-work',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './view-work.component.html',
  styleUrl: './view-work.component.css',
})
export class ViewWorkComponent implements OnInit {
  slno: number | null = null;
  userRole: string | null = null;
  clients: any[] = [];
    workAssignments: any[] = [];

  employees: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<ViewWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: BACService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private confirmSevice:ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userRole = this.data.userRole;
    this.slno = this.data.slno;
    this.work.status = this.data.status;

    this.load();
  }

  work: {
    title: string;
    description: string;
    client: number | null;
    driveLink: string;
    remark: string;
    status: string;

  } = {
    title: '',
    description: '',
    client: null,
    driveLink: '',
    remark: '',
    status: '',
  };

  copyLink(link: any) {
    navigator.clipboard.writeText(link);
  }

  openLink(link: any) {
    window.open(link, '_blank');
  }

  close() {
    this.dialogRef.close();
  }


  
  // ================= EMPLOYEE =================
  filterEmployees(index: number) {
    const search = (this.workAssignments[index].employeeSearch || '').toLowerCase();

    this.workAssignments[index].filteredEmployees = this.employees.filter(e =>
      e.name.toLowerCase().includes(search)
    );
  }

  selectEmployee(value: string, index: number) {
    const emp = this.employees.find(e => e.name === value);

    if (emp) {
      this.workAssignments[index].employee = emp.id;
      this.workAssignments[index].employeeSearch = emp.name;
    }
  }

  load() {
    this.service.LoadEditWork(this.slno).subscribe({
      next: (res) => {
        console.log(res, 'work');

        this.clients = res.data[1];
        const client = this.clients.find((c) => c.id == res.data[0][0].client);
        this.work.client = client ? client.Client : '';
        this.work.description=res.data[0][0].description
        this.work.driveLink=res.data[0][0].link
        this.work.title=res.data[0][0].title
        this.work.remark=res.data[0][0].remark

                this.employees = res.data[2] || [];

        const tags = res.data[3] || [];

        // ✅ FIX: Replace workAssignments completely
        this.workAssignments = tags.length
          ? tags.map((t: any) => {
              const emp = this.employees.find(e => e.id == t.USR_SLNO);

              return {
                tag: t.TE_TAG || '',
                employee: t.USR_SLNO || null,
                employeeSearch: emp ? emp.name : '',
                filteredEmployees: [...this.employees]
              };
            })
          : [
              {
                tag: '',
                employee: null,
                employeeSearch: '',
                filteredEmployees: [...this.employees]
              }
            ];

            console.log(this.workAssignments,'workassignments');
            

      },
      error: (err) => {
        console.log(err);

        this.toastr.error(
          'An error occurred while loading user. Please try again.',
          'Error',
        );

        this.loader.hideLoader();
      },
      complete: () => {
        this.loader.hideLoader();
      },
    });
  }

      async ApproveOrRjectWork(desicion:any) {

    const ok = await this.confirmSevice.open({
      title: desicion==1?'Approve Work':'Reject Work',
      message: desicion==1?'Are you sure you want to approve this work?':'Are you sure you want to reject this work?',
      type: desicion==1?'success':'info',
      confirmText: desicion==1?'Approve':'Reject',
    });

    if (!ok) return;
    this.loader.showLoader()
    this.service.ApproveOrRejectWork(this.slno,desicion,this.work.remark).subscribe({
      next: (res) => {
        if(desicion==1){
        if(res.data[0].MSG=='Success'){
          this.toastr.success('Work Approved successfully','Successful')
          this.load()
          this.close()
        }
      }else{
        if(res.data[0].MSG=='Success'){
          this.toastr.success('Work Rejected successfully','Successful')
          this.load()
          this.close()
        }
      }
      },
      error: (err) => {

        console.log(err);

        this.toastr.error(
          'An error occurred while deleting users. Please try again.',
          'Error'
        );

        this.loader.hideLoader();
      },
      complete: () => {
        this.loader.hideLoader();
      }
    });
    
    
  }
}
