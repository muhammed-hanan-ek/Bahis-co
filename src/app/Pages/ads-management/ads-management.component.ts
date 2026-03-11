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
  constructor(private dialog: MatDialog) {}

  showFilter = false;
  searchText = '';
  activeMenu: number | null = null;
  userRole: string | null = 'Client';

  // pagination variables and function
  page = 1;
  itemsPerPage = 8;

  onItemsPerPageChange(value: string) {
    this.itemsPerPage = +value; // convert to number
    this.page = 1; // reset to first page
  }

  ads = [
    {
      title: 'Instagram Ad',
      client: 'ABC Company',
      dateperiod: '21-02-2026 to 02-03-2026',
      Revenue: '10000',
      status: 'Completed',
      spend: 100,
    },
    {
      title: 'Facebook Ad',
      client: 'Nova Tech',
      dateperiod: '25-02-2026 to 10-03-2026',
      Revenue: '15000',
      status: 'Active',
      spend: 100,
    },
    {
      title: 'Google Display Ad',
      client: 'Skyline Pvt Ltd',
      dateperiod: '01-03-2026 to 15-03-2026',
      Revenue: '20000',
      status: 'Active',
      spend: 100,
    },
    {
      title: 'YouTube Ad',
      client: 'Bright Media',
      dateperiod: '10-02-2026 to 28-02-2026',
      Revenue: '18000',
      status: 'Completed',
      spend: 100,
    },
    {
      title: 'LinkedIn Ad',
      client: 'Global Corp',
      dateperiod: '05-03-2026 to 20-03-2026',
      Revenue: '22000',
      status: 'Active',
      spend: 100,
    },
    {
      title: 'Twitter Ad',
      client: 'NextGen Solutions',
      dateperiod: '15-02-2026 to 01-03-2026',
      Revenue: '9000',
      status: 'Completed',
      spend: 100,
    },
    {
      title: 'Instagram Story Ad',
      client: 'Urban Fashion',
      dateperiod: '02-03-2026 to 12-03-2026',
      Revenue: '13000',
      status: 'Active',
      spend: 100,
    },
    {
      title: 'Google Search Ad',
      client: 'Smart Electronics',
      dateperiod: '18-02-2026 to 05-03-2026',
      Revenue: '25000',
      status: 'Completed',
      spend: 100,
    },
    {
      title: 'Facebook Carousel Ad',
      client: 'GreenLife Organics',
      dateperiod: '03-03-2026 to 18-03-2026',
      Revenue: '14000',
      status: 'Active',
      spend: 100,
    },
    {
      title: 'YouTube Shorts Ad',
      client: 'TravelGo Agency',
      dateperiod: '22-02-2026 to 07-03-2026',
      Revenue: '17000',
      status: 'Completed',
      spend: 100,
    },
  ];

  filteredads: any[] = [];

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

    this.filteredads = this.ads.filter((ads) =>
      ads.title.toLowerCase().includes(text),
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

    this.filteredads = [...this.ads];
  }

  /* APPLY FILTERS */

  // applyFilters() {

  //   this.filteredads = this.ads.filter(ads => {

  //     const monthMatch =
  //       !this.filters.month || ads.month === this.filters.month;

  //     const clientMatch =
  //       this.filters.clients.length === 0 ||
  //       this.filters.clients.includes(ads.client);

  //     const statusMatch =
  //       this.filters.status.length === 0 ||
  //       this.filters.status.includes(ads.status);

  //     return monthMatch && clientMatch && statusMatch;

  //   });

  //   this.showFilter = false;

  // }

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
        console.log('closed');
      },
    });
  }
  openconversion(isEdit: boolean, slno: string | null) {
    this.dialog.open(CreateEditConversionComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: {
        isEdit,
        slno,
      },
    });
  }

  viewAd(slno: any) {
    console.log('view ad click');

    this.dialog.open(ViewAdComponent, {
      width: '100vw',
      height: '95vh',
      minWidth: '100vw',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-top-dialog',
      data: {
        slno: slno,
      },
    });
  }

  /* STATUS COUNTS */

  get ActiveCount() {
    return this.ads.filter((w) => w.status === 'Active').length;
  }

  get TotalSpend() {
    return this.ads.reduce((sum, ad) => sum + Number(ad.spend), 0);
  }

  get TotalRevenue() {
    return this.ads.reduce((sum, ad) => sum + Number(ad.Revenue), 0);
  }

  editads(ads: any) {
    console.log('Edit', ads);
  }

  deleteads(ads: any) {
    console.log('Delete', ads);
  }
}
