import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../user-management/create-edit-user/create-edit-user.component';
import { CreateEditWorkComponent } from './create-edit-work/create-edit-work.component';
import { ViewWorkComponent } from './view-work/view-work.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedService } from '../../shared/shared.service';
import { BACService } from '../../Service/bac.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../loader/loader.service';
import { ConfirmationService } from '../../confirmation/confirmation.service';
import { ApiUrl } from '../../app.contsant';



@Component({
  selector: 'app-staff-work-management',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './staff-work-management.component.html',
  styleUrl: './staff-work-management.component.css',
})
export class StaffWorkManagementComponent implements OnInit {
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: any) {
    // Close filter dropdown
    if (!event.target.closest('.filter-container')) {
      this.showFilter = false;
    }

    // Close 3-dot menu
    if (!event.target.closest('.menu-container')) {
      this.activeMenu = null;
    }
  }

  showFilter = false;
  searchText = '';
  statuses:any[]=[]
  activeMenu: number | null = null;
  userRole: string | null = null;

  // pagination variables and function
  page = 1;
  itemsPerPage = 8;

  onItemsPerPageChange(value: string) {
    this.itemsPerPage = +value; // convert to number
    this.page = 1; // reset to first page
  }

  works: any[] = [];

  filteredWorks: any[] = [];

  clients :any[]= [];

  employees:any[] = [];

  ApiUrl=ApiUrl

  filters: {
    month:string,
    clients:number[],
    status:number[],
    employees:number[]
  } = {
    month: '',
    clients: [],
    status: [],
    employees: [],
  };


  constructor(
    private dialog: MatDialog,
    private shared:SharedService,
    private service:BACService,
    private toastr:ToastrService,
    private loader:LoaderService,
    private confirmSevice:ConfirmationService
  ) {}


  ngOnInit(): void {
    this.shared.Role$.subscribe({
      next:(res)=>{
        this.userRole=res
      }
    })
    const today = new Date();
    this.filters.month = today.toISOString().slice(0, 7);
    this.onload()
    this.filteredWorks = [...this.works];

  }

  toggleFilter(event?: Event) {
    this.activeMenu = null;
    event?.stopPropagation();
    this.showFilter = !this.showFilter;
  }

  toggleMenu(index: number, event: Event) {
    this.showFilter = false;
    event.stopPropagation();

    this.activeMenu = this.activeMenu === index ? null : index;
  }

  /* SEARCH */

  searchWorks() {
    const text = this.searchText.toLowerCase();

    this.filteredWorks = this.works.filter((work) =>
      work.title.toLowerCase().includes(text),
    );
  }

  /* CLIENT FILTER */

  toggleClient(id: number, checked: boolean) {
  if (checked) {
    if (!this.filters.clients.includes(id)) {
      this.filters.clients = [...this.filters.clients, id];
    }
  } else {
    this.filters.clients = this.filters.clients.filter(x => x !== id);
  }
}

  /* STATUS FILTER */

  toggleStatus(status: number, checked: boolean) {
    if (checked) {
    if (!this.filters.status.includes(status)) {
      this.filters.status = [...this.filters.status, status];
    }
  } else {
    this.filters.status = this.filters.status.filter(x => x !== status);
  }

  }

  // emp filter

  toggleEmployee(emp: any, checked: boolean) {
    if (checked) {
    if (!this.filters.employees.includes(emp)) {
      this.filters.employees = [...this.filters.employees, emp];
    }
  } else {
    this.filters.employees = this.filters.employees.filter(x => x !== emp);
  }
  }

  /* CLEAR FILTERS */

  clearFilters() {
    const today = new Date();

    this.filters = {
      month: today.toISOString().slice(0, 7),
      clients: [],
      status: [],
      employees:[]
    };
    this.showFilter=false
    this.filteredWorks = [...this.works];
    this.onload()
  }

  /* APPLY FILTERS */

  applyFilters() {
    this.onload()
    this.showFilter = false;
  }

  /* CREATE WORK */

  openwork(isEdit: boolean, slno: string | null) {
    const dialogRef=this.dialog.open(CreateEditWorkComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: {
        isEdit,
        slno,
      },
    });

    dialogRef.afterClosed().subscribe({
      next:()=>this.onload()
    })
  }

  viewwork(slno: string | null,status:string) {
    const dialogRef=this.dialog.open(ViewWorkComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: {
        slno,
        userRole: this.userRole,
        status: status,
      },
    });

    dialogRef.afterClosed().subscribe({
      next:()=>this.onload()
    })
  }

  /* STATUS COUNTS */

  get pendingCount() {
    return this.works.filter((w) => w.status === 'Pending').length;
  }

  get approvedCount() {
    return this.works.filter((w) => w.status === 'Approved').length;
  }

  get rejectedCount() {
    return this.works.filter((w) => w.status === 'Rejected').length;
  }


  onload(){
    this.loader.showLoader()
    this.service.LoadworkReport(this.filters.employees,this.filters.status,this.filters.clients,this.filters.month).subscribe({
      next:(res)=>{
        this.works=res.data[0]
        this.filteredWorks = [...this.works];
        this.statuses=res.data[1]
        this.clients=res.data[2]
        this.employees=res.data[3]
        console.log(res);

      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('An error occurred while loading works. Please try again.','Error')
      },
      complete:()=>{
        this.loader.hideLoader()
      }
    })
  }

  async deleteWork(slno:any) {

    const ok = await this.confirmSevice.open({
      title: 'Delete Work',
      message: 'Are you sure you want to delete this work?',
      type: 'danger',
      confirmText: 'Delete',
    });

    if (!ok) return;
    this.loader.showLoader()
    this.service.DeleteWork(slno).subscribe({
      next: (res) => {
        if(res.data[0].MSG=='Success'){
          this.toastr.success('Work deleted successfully','Successful')
          this.onload()
        }
      },
      error: (err) => {

        console.log(err);

        this.toastr.error(
          'An error occurred while deleting work. Please try again.',
          'Error'
        );

        this.loader.hideLoader();
      },
      complete: () => {
        this.loader.hideLoader();
      }
    });
    
    
  }

  pdf(){
    this.loader.showLoader()
    this.service.LoadworkPdf(this.filters.employees,this.filters.status,this.filters.clients,this.filters.month).subscribe({
      next:(res)=>{
        
        console.log(res);
        if (res && res.filename) {
                    window.open(`${ApiUrl}/uploads/PDF/${res.filename}`);
                } else {
                    this.toastr.error('PDF Export Failed');
                }

      },

      error:(err)=>{
        console.log(err);
        this.toastr.error('An error occurred while loading works. Please try again.','Error')
      },
      complete:()=>{
        this.loader.hideLoader()
      }
    })
  }
  Excel(){
    this.loader.showLoader()
    this.service.LoadworkExcel(this.filters.employees,this.filters.status,this.filters.clients,this.filters.month).subscribe({
      next:(res)=>{
        
        console.log(res);
        if (res && res.filename) {
                    window.open(`${ApiUrl}/uploads/excel/${res.filename}`);
                } else {
                    this.toastr.error('excel Export Failed');
                }

      },

      error:(err)=>{
        console.log(err);
        this.toastr.error('An error occurred while loading works. Please try again.','Error')
      },
      complete:()=>{
        this.loader.hideLoader()
      }
    })
  }

}
