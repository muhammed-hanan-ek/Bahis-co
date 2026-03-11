import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { ConfirmationService } from '../../confirmation/confirmation.service';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  constructor( 
    private dialog: MatDialog,
    private confirmService:ConfirmationService
  ){}

  selectedFilter: string = 'All';

  users = [
    { avatar: 'A1', name: 'Admin 1', email: 'admin1@gmail.com', role: 'Admin', isActive: true },
    { avatar: 'S1', name: 'Staff 1', email: 'staff1@gmail.com', role: 'Staff', isActive: true },
    { avatar: 'S2', name: 'Staff 2', email: 'staffaaaaaaaaaaaaaaa2@gmail.com', role: 'Staff', isActive: true },
    { avatar: 'C1', name: 'Client 1', email: 'client1@gmail.com', role: 'Client', isActive: true },
    { avatar: 'C2', name: 'Client 2', email: 'client2@gmail.com', role: 'Client', isActive: false }
  ];

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

 openUser(isEdit: boolean, slno: string | null) {

  this.dialog.open(CreateEditUserComponent, {
    width: '500px',
    maxWidth: '95vw',
    panelClass: 'responsive-dialog',
    data: {
      isEdit,
      slno
    }
  });

}

  get filteredUsers() {
    if (this.selectedFilter === 'All') {
      return this.users;
    }
    return this.users.filter(user => user.role === this.selectedFilter);
  }

  get adminCount() {
    return this.users.filter(u => u.role === 'Admin').length;
  }

  get staffCount() {
    return this.users.filter(u => u.role === 'Staff').length;
  }

  get clientCount() {
    return this.users.filter(u => u.role === 'Client').length;
  }

  async deleteUser(){

const ok = await this.confirmService.open({
title:'Delete User',
message:'Are you sure you want to delete this user?',
type:'success',
confirmText:'Confirm'
});

if(!ok) return;



}

}
