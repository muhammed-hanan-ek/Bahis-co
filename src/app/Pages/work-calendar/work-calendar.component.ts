import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../user-management/create-edit-user/create-edit-user.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { SharedService } from '../../shared/shared.service';
import { BACService } from '../../Service/bac.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../loader/loader.service';
import { ConfirmationService } from '../../confirmation/confirmation.service';
import { ApiUrl } from '../../app.contsant';
import { CreateEditWorkComponent } from '../staff-work-management/create-edit-work/create-edit-work.component';
import { ViewWorkComponent } from '../staff-work-management/view-work/view-work.component';
import { CreateEditWorkCalendarComponent } from './create-edit-work-calendar/create-edit-work-calendar.component';

@Component({
  selector: 'app-work-calendar',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './work-calendar.component.html',
  styleUrl: './work-calendar.component.css',
})
export class WorkCalendarComponent {
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: any) {
    // Close filter dropdown
    if (!event.target.closest('.filter-container')) {
      this.showFilter = false;
    }
  }

  showFilter = false;
  userRole: string | null = null;

  // pagination variables and function
  page = 1;
  itemsPerPage = 8;

  onItemsPerPageChange(value: string) {
    this.itemsPerPage = +value; // convert to number
    this.page = 1; // reset to first page
  }

  works: any[] = [
    {
      title: 'hello',
      client: 'client1',
      content: 'post on instagram',
      date: '12/12/2002',
      status: 'Pending',
    },
    {
      title: 'hello',
      client: 'client1',
      content: 'post on instagram',
      date: '12/12/2002',
      status: 'Completed',
    },
  ];

  filteredWorks: any[] = [];

  clients: any[] = [
    { id: 1, name: 'client1' },
    { id: 2, name: 'client2' },
  ];

  statuses: any[] = [
    { id: 1, name: 'pedning' },
    { id: 2, name: 'completed' },
  ];

  ApiUrl = ApiUrl;

  filters: {
    date: string;
    clients: number[];
    status: number[];
  } = {
    date: '',
    clients: [],
    status: [],
  };

  constructor(
    private dialog: MatDialog,
    private shared: SharedService,
    private service: BACService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private confirmSevice: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.shared.Role$.subscribe({
      next: (res) => {
        this.userRole = res;
      },
    });
    const today = new Date();
    this.filters.date = today.toISOString().split('T')[0];
    this.onload();
    this.filteredWorks = [...this.works];
  }

  toggleFilter(event?: Event) {
    event?.stopPropagation();
    this.showFilter = !this.showFilter;
  }

  /* CLIENT FILTER */

  toggleClient(id: number, checked: boolean) {
    if (checked) {
      if (!this.filters.clients.includes(id)) {
        this.filters.clients = [...this.filters.clients, id];
      }
    } else {
      this.filters.clients = this.filters.clients.filter((x) => x !== id);
    }
  }

  /* STATUS FILTER */

  toggleStatus(status: number, checked: boolean) {
    if (checked) {
      if (!this.filters.status.includes(status)) {
        this.filters.status = [...this.filters.status, status];
      }
    } else {
      this.filters.status = this.filters.status.filter((x) => x !== status);
    }
  }

  /* CLEAR FILTERS */

  clearFilters() {
    const today = new Date();

    this.filters = {
      date: today.toISOString().split('T')[0],
      clients: [],
      status: [],
    };
    this.showFilter = false;
    this.filteredWorks = [...this.works];
    this.onload();
  }

  /* APPLY FILTERS */

  applyFilters() {
    this.onload();
    this.showFilter = false;
  }

  /* CREATE WORK */

  openwork(isEdit: boolean, slno: string | null) {
    const dialogRef = this.dialog.open(CreateEditWorkCalendarComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: {
        isEdit,
        slno,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: () => this.onload(),
    });
  }

  /* STATUS COUNTS */

  get pendingCount() {
    return this.works.filter((w) => w.status === 'Pending').length;
  }

  get completedCount() {
    return this.works.filter((w) => w.status === 'Completed').length;
  }

  onload() {
    this.loader.showLoader();
    this.service
      .calendarlist(
        this.filters.status,
        this.filters.clients,
        this.filters.date,
      )
      .subscribe({
        next: (res) => {
          this.works = res.data[0];
          this.filteredWorks = [...this.works];
          this.statuses = res.data[1];
          this.clients = res.data[2];
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(
            'An error occurred while loading work calendar. Please try again.',
            'Error',
          );
        },
        complete: () => {
          this.loader.hideLoader();
        },
      });
  }

  async deleteWork(slno: any) {
    const ok = await this.confirmSevice.open({
      title: 'Delete Work',
      message: 'Are you sure you want to delete this work?',
      type: 'danger',
      confirmText: 'Delete',
    });

    if (!ok) return;
    this.loader.showLoader();
    this.service.deletecalendar(slno).subscribe({
      next: (res) => {
        if (res.data[0].MSG == 'Success') {
          this.toastr.success('Work deleted successfully', 'Successful');
          this.onload();
        }
      },
      error: (err) => {
        console.log(err);

        this.toastr.error(
          'An error occurred while deleting work . Please try again.',
          'Error',
        );

        this.loader.hideLoader();
      },
      complete: () => {
        this.loader.hideLoader();
      },
    });
  }

  async markAsComplete(slno: any) {
    const ok = await this.confirmSevice.open({
      title: 'Work mark as completed',
      message: 'Are you sure you want to mark this work as completed?',
      type: 'info',
      confirmText: 'Confirm',
    });

    if (!ok) return;

    this.loader.showLoader();
    this.service.markAsComplete(slno).subscribe({
      next: (res) => {
        if (res.data[0].MSG == 'Success') {
          this.toastr.success('Work marked as completed', 'Successful');
          this.onload();
        }
      },
      error: (err) => {
        console.log(err);

        this.toastr.error(
          'An error occurred while marking this work as completed. Please try again.',
          'Error',
        );

        this.loader.hideLoader();
      },
      complete: () => {
        this.loader.hideLoader();
      },
    });
  }

  pdf() {
    this.loader.showLoader();
    this.service
      .calendarpdf(this.filters.status, this.filters.clients, this.filters.date)
      .subscribe({
        next: (res) => {
          if (res && res.filename) {
            window.open(`${ApiUrl}/uploads/PDF/${res.filename}`);
          } else {
            this.toastr.error('PDF Export Failed');
          }
        },

        error: (err) => {
          console.log(err);
          this.toastr.error(
            'An error occurred while loading works. Please try again.',
            'Error',
          );
        },
        complete: () => {
          this.loader.hideLoader();
        },
      });
  }
  Excel() {
    this.loader.showLoader();
    this.service
      .calendarExcel(
        this.filters.status,
        this.filters.clients,
        this.filters.date,
      )
      .subscribe({
        next: (res) => {
          if (res && res.filename) {
            window.open(`${ApiUrl}/uploads/excel/${res.filename}`);
          } else {
            this.toastr.error('excel Export Failed');
          }
        },

        error: (err) => {
          console.log(err);
          this.toastr.error(
            'An error occurred while loading works. Please try again.',
            'Error',
          );
        },
        complete: () => {
          this.loader.hideLoader();
        },
      });
  }
}
