import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-edit-conversion',
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-edit-conversion.component.html',
  styleUrl: './create-edit-conversion.component.css',
})
export class CreateEditConversionComponent implements OnInit {
  isEdit: boolean = false;
  AmtNumber: boolean = false;
  AdSearch: any = null;
  ads: any[] = ['ad1', 'ad2', 'ad3'];
  filteredads: any[] = [];
  form = {
    ad: '',
    converioncount: 0,
    amount: '',
  };

  constructor(
    private dialogRef: MatDialogRef<CreateEditConversionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
  }

  filterads() {
    this.filteredads = this.ads.filter((ad) =>
      ad.toLowerCase().includes(this.AdSearch.toLowerCase()),
    );
  }

  selectad(ad: any) {
    this.form.ad = ad.id;
  }

  validateAmt(value: string) {
    const regex = /^\d+(\.\d+)?$/; // regular expression for amount

    if (!regex.test(value)) {
      this.AmtNumber = true;
      // prevent invalid character from staying in the input
      this.form.amount = value.replace(/^\d+(\.\d+)?$/g, '');
    } else {
      this.AmtNumber = false;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
