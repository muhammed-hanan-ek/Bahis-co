import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditWorkComponent } from '../staff-work-management/create-edit-work/create-edit-work.component';
import { ViewWorkComponent } from '../staff-work-management/view-work/view-work.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateEditAdComponent } from './create-edit-ad/create-edit-ad.component';
import { CreateEditConversionComponent } from './create-edit-conversion/create-edit-conversion.component';
import { ViewAdComponent } from './view-ad/view-ad.component';
import { BACService } from '../../Service/bac.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../loader/loader.service';
import { ConfirmationService } from '../../confirmation/confirmation.service';
import { SharedService } from '../../shared/shared.service';
import { ApiUrl } from '../../app.contsant';

@Component({
  selector: 'app-ads-management',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './ads-management.component.html',
  styleUrl: './ads-management.component.css',
})
export class AdsManagementComponent {
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
  constructor(
    private shared:SharedService,
    private dialog: MatDialog,
    private service:BACService,
        private toastr:ToastrService,
        private loader:LoaderService,
        private confirmSevice:ConfirmationService
  ) {}

  showFilter = false;
  ApiUrl=ApiUrl
  searchText = '';
  activeMenu: number | null = null;
  userRole: string | null = 'Admin';

  // pagination variables and function
  page = 1;
  itemsPerPage = 8;

  onItemsPerPageChange(value: string) {
    this.itemsPerPage = +value; // convert to number
    this.page = 1; // reset to first page
  }

  ads :any[]= [];

  statuses:any[]=[]

  filteredads: any[] = [];

   clients :any[]= [];

  employees = ['emp1', 'emp2'];

  filters: any = {
    month: '',
    clients: [],

  };

  ngOnInit(): void {
    this.shared.Role$.subscribe({
      next:(res)=>{
        this.userRole=res
      }
    })
    const today = new Date();
    this.filters.month = today.toISOString().slice(0, 7);
    this.onload()
    this.filteredads = [...this.ads];
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

  searchads() {
     const text = this.searchText.toLowerCase();

    this.filteredads = this.ads.filter((ad) =>
      ad.title.toLowerCase().includes(text),
    );
  }

  /* CLIENT FILTER */

  toggleClient(id: number, checked: boolean) {
    if (checked) {
    if (!this.filters.clients.includes(id)) {
      this.filters.clients = [...this.filters.clients, id];
    }
  } else {
    this.filters.clients = this.filters.clients.filter((x: any) => x !== id);
  }
  }

  /* STATUS FILTER */

  toggleStatus(status: number, checked: boolean) {
    if (checked) {
    if (!this.filters.status.includes(status)) {
      this.filters.status = [...this.filters.status, status];
    }
  } else {
    this.filters.status = this.filters.status.filter((x: any) => x !== status);
  }
  }

  toggleEmployee(emp: any, checked: boolean) {
    if (checked) {
    if (!this.filters.employees.includes(emp)) {
      this.filters.employees = [...this.filters.employees, emp];
    }
  } else {
    this.filters.employees = this.filters.employees.filter((x: any) => x !== emp);
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
    this.filteredads = [...this.ads];
    this.onload()
  }

  /* APPLY FILTERS */

  applyFilters() {
    console.log(this.filters);
    this.onload()
    this.showFilter = false;

  }

  /* CREATE ads */

  openads(isEdit: boolean, slno: string | null) {
    const dialogref = this.dialog.open(CreateEditAdComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: {
        isEdit,
        slno,
      },
    });
    dialogref.afterClosed().subscribe({
      next: () => {
        this.onload()
      },
    });
  }
  openconversion(isEdit: boolean, slno: string | null) {
    const dialogRef=this.dialog.open(CreateEditConversionComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: {
        isEdit,
        slno,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.onload()
      },
    });
  }

  viewAd(slno: any) {
    console.log('view ad click');

    const dialogRef=this.dialog.open(ViewAdComponent, {
      width: '100vw',
      height: '95vh',
      minWidth: '100vw',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-top-dialog',
      data: {
        slno: slno,
      },
    });
     dialogRef.afterClosed().subscribe({
      next: () => {
        this.onload()
      },
    });
  }

  /* STATUS COUNTS */

  get ActiveCount() {
    return this.ads.filter((Ad) => Ad.status === 'Active').length;
  }

  get TotalSpend() {
    return this.ads.reduce((sum, ad) => sum + Number(ad.spend), 0);
  }

  get TotalRevenue() {
    return this.ads.reduce((sum, ad) => sum + Number(ad.Revenue), 0);
  }

    onload(){
    this.loader.showLoader()
    this.service.LoadAdReport(this.filters.clients,this.filters.month).subscribe({
      next:(res)=>{
        this.ads=res.data[0]
        this.filteredads = [...this.ads];
        this.clients=res.data[1]
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

  pdf(){
      this.loader.showLoader()
      this.service.LoadAdpdf(this.filters.clients,this.filters.month).subscribe({
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
      this.service.LoadAdExcel(this.filters.clients,this.filters.month).subscribe({
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

  // editads(a:any){}
 async deleteads(SLNO:any){
    

    const ok = await this.confirmSevice.open({
      title: 'Delete Ad',
      message: 'Are you sure you want to delete this Ad?',
      type: 'danger',
      confirmText: 'Delete',
    });

    if (!ok) return;
    this.loader.showLoader()
    this.service.DeleteAD(SLNO).subscribe({
      next: (res) => {
        if(res.data[0].MSG=='Success'){
          this.toastr.success('Ad deleted successfully','Successful')
          this.onload()
        }
      },
      error: (err) => {

        console.log(err);

        this.toastr.error(
          'An error occurred while deleting ad. Please try again.',
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
