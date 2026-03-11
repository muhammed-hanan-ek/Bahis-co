import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateEditConversionComponent } from '../create-edit-conversion/create-edit-conversion.component';

@Component({
  selector: 'app-view-ad',
  imports: [NgxPaginationModule, CommonModule, FormsModule],
  templateUrl: './view-ad.component.html',
  styleUrl: './view-ad.component.css',
})
export class ViewAdComponent {
  conversions: any[] = [
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
    {
      count: 1,
      amount: 1000,
      date: '11/03/2026',
    },
  ];
  activeMenu: any = null;

  // pagination variables and function
  page = 1;
  itemsPerPage = 12;

  onItemsPerPageChange(value: string) {
    this.itemsPerPage = +value; // convert to number
    this.page = 1; // reset to first page
  }

  constructor(
    private dialogRef: MatDialogRef<ViewAdComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  toggleMenu(index: number, event: Event) {
    event.stopPropagation();

    this.activeMenu = this.activeMenu === index ? null : index;
  }

  editConversion(isEdit: boolean, slno: any) {
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

  close() {
    this.dialogRef.close();
  }
}
