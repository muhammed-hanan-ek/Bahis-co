import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { ConfirmationService } from '../../confirmation/confirmation.service';
import { ToastrService } from 'ngx-toastr';
import { BACService } from '../../Service/bac.service';
import { LoaderService } from '../../loader/loader.service';
import { ApiUrl } from '../../app.contsant';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {

  selectedFilter: string = 'All';
  searchText: string = '';

  users: any[] = [];
  filteredUsers: any[] = [];
  ApiUrl=ApiUrl

  constructor(
    private dialog: MatDialog,
    private confirmService: ConfirmationService,
    private toastr: ToastrService,
    private service: BACService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.onload();
  }

  // ---------- FILTER ----------
  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.applyFilters();
  }

  searchWorks() {
    this.applyFilters();
  }

  applyFilters() {
    let users = [...this.users];

    // Role filter
    if (this.selectedFilter !== 'All' && this.selectedFilter != 'Staff') {
      users = users.filter(user => user.Role === this.selectedFilter);
    }
    else if(this.selectedFilter !== 'All' && this.selectedFilter =='Staff'){
      users = users.filter(user => user.Role === 'Staff' || user.Role=='Marketing Head');
    }

    // Search filter
    if (this.searchText) {
      const text = this.searchText.toLowerCase();
      users = users.filter(user =>
        user.name.toLowerCase().includes(text)
      );
    }

    this.filteredUsers = users;
  }

  // ---------- USER DIALOG ----------
  openUser(isEdit: boolean, slno: any | null) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: { isEdit, slno }
    });

    dialogRef.afterClosed().subscribe({
      next: () => this.onload()
    });
  }

  // ---------- COUNTS ----------
  get adminCount() {
    return this.users.filter(u => u.Role === 'Admin').length;
  }

  get staffCount() {
    return this.users.filter(u => u.Role === 'Staff' || u.Role==='Marketing Head').length;
  }

  get clientCount() {
    return this.users.filter(u => u.Role === 'Client').length;
  }

  // ---------- DELETE ----------
  async deleteUser(slno:any) {

    const ok = await this.confirmService.open({
      title: 'Delete User',
      message: 'Are you sure you want to delete this user?',
      type: 'danger',
      confirmText: 'Delete',
    });

    if (!ok) return;
    this.loader.showLoader()
    this.service.DeleteUser(slno).subscribe({
      next: (res) => {
        if(res.result=='success'){
          this.toastr.success('User deleted successfully','Successful')
          this.onload()
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

  // ---------- LOAD USERS ----------
  onload() {

    this.loader.showLoader();

    this.service.LoadUserList().subscribe({
      next: (res) => {

        this.users = res.data || [];
        this.filteredUsers = [...this.users];

        console.log(this.users);

      },
      error: (err) => {

        console.log(err);

        this.toastr.error(
          'An error occurred while loading users. Please try again.',
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