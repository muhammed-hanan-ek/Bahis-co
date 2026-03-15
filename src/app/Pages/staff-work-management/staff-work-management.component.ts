import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../user-management/create-edit-user/create-edit-user.component';
import { CreateEditWorkComponent } from './create-edit-work/create-edit-work.component';
import { ViewWorkComponent } from './view-work/view-work.component';
import { NgxPaginationModule } from 'ngx-pagination';

interface Work {
  title: string;
  client: string;
  month: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

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
  constructor(private dialog: MatDialog) {}

  showFilter = false;
  searchText = '';
  activeMenu: number | null = null;
  userRole: string | null = 'Staff';

  // pagination variables and function
  page = 1;
  itemsPerPage = 8;

  onItemsPerPageChange(value: string) {
    this.itemsPerPage = +value; // convert to number
    this.page = 1; // reset to first page
  }

  works: Work[] = [
    {
      title: 'Website UI Design',
      client: 'ABC Company',
      month: '2024-06',
      status: 'Pending',
    },
    {
      title: 'API Integration',
      client: 'TechCorp',
      month: '2024-06',
      status: 'Approved',
    },
    {
      title: 'Mobile Bug Fix',
      client: 'Global Solutions',
      month: '2024-06',
      status: 'Rejected',
    },
    {
      title: 'Mobile Bug Fix',
      client: 'Global Solutions',
      month: '2024-06',
      status: 'Rejected',
    },
    {
      title: 'Website UI Design',
      client: 'ABC Company',
      month: '2024-06',
      status: 'Pending',
    },
    {
      title: 'API Integration',
      client: 'TechCorp',
      month: '2024-06',
      status: 'Approved',
    },
    {
      title: 'Mobile Bug Fix',
      client: 'Global Solutions',
      month: '2024-06',
      status: 'Rejected',
    },
    {
      title: 'Mobile Bug Fix',
      client: 'Global Solutions',
      month: '2024-06',
      status: 'Rejected',
    },
    {
      title: 'Mobile Bug Fix',
      client: 'Global Solutions',
      month: '2024-06',
      status: 'Rejected',
    },
  ];

  filteredWorks: Work[] = [];

  clients = ['ABC Company', 'TechCorp', 'Global Solutions', 'NextGen Labs'];

  employees = ['emp1', 'emp2'];

  filters: any = {
    month: '',
    clients: [],
    status: [],
    employees: [],
  };

  ngOnInit(): void {
    const today = new Date();
    this.filters.month = today.toISOString().slice(0, 7);

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

  toggleClient(client: string, event: any) {
    if (event.target.checked) {
      if (!this.filters.clients.includes(client)) {
        this.filters.clients.push(client);
      }
    } else {
      this.filters.clients = this.filters.clients.filter(
        (c: string) => c !== client,
      );
    }
  }

  /* STATUS FILTER */

  toggleStatus(status: string, event: any) {
    if (event.target.checked) {
      if (!this.filters.status.includes(status)) {
        this.filters.status.push(status);
      }
    } else {
      this.filters.status = this.filters.status.filter(
        (s: string) => s !== status,
      );
    }
  }

  toggleEmployee(emp: any, event: any) {
    if (event.target.checked) {
      this.filters.employees.push(emp.id);
    } else {
      this.filters.employees = this.filters.employees.filter(
        (e: any) => e !== emp.id,
      );
    }
  }

  /* CLEAR FILTERS */

  clearFilters() {
    const today = new Date();

    this.filters = {
      month: today.toISOString().slice(0, 7),
      clients: [],
      status: [],
    };

    this.filteredWorks = [...this.works];
  }

  /* APPLY FILTERS */

  applyFilters() {
    this.filteredWorks = this.works.filter((work) => {
      const monthMatch =
        !this.filters.month || work.month === this.filters.month;

      const clientMatch =
        this.filters.clients.length === 0 ||
        this.filters.clients.includes(work.client);

      const statusMatch =
        this.filters.status.length === 0 ||
        this.filters.status.includes(work.status);

      return monthMatch && clientMatch && statusMatch;
    });

    this.showFilter = false;
  }

  /* CREATE WORK */

  openwork(isEdit: boolean, slno: string | null) {
    this.dialog.open(CreateEditWorkComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: {
        isEdit,
        slno,
      },
    });
  }

  viewwork(slno: string | null) {
    this.dialog.open(ViewWorkComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: {
        slno,
        userRole: this.userRole,
      },
    });
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

  editWork(work: any) {
    console.log('Edit', work);
  }

  deleteWork(work: any) {
    console.log('Delete', work);
  }
}
