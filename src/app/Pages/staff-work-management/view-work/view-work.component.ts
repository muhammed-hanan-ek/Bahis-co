import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-work',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './view-work.component.html',
  styleUrl: './view-work.component.css',
})
export class ViewWorkComponent implements OnInit {
  slno: number | null = null;
  userRole: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<ViewWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.userRole = this.data.userRole;
  }

  work = {
    title: 'Website UI design',
    description: 'Description 1',
    client: 'ABC Company',
    driveLink: 'https://link',
    remark: '',
    status:'Approved'
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
}
