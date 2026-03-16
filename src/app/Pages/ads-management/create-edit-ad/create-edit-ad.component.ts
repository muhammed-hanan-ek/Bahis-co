import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-edit-ad',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-edit-ad.component.html',
  styleUrl: './create-edit-ad.component.css',
})
export class CreateEditAdComponent implements OnInit {
  isEdit: boolean = false;
  AmtNumber: boolean = false;
  adSearch: any = null;
  filteredads: any[] = [];
  form = {
    ad: null,
    client: null,
    startDate: null,
    endDate: null,
    amount: '',
  };

  ads:any[] =[
    {id:1,name:'ad1',client:'c1'},
    {id:2,name:'ad2',client:'c2'},
    {id:3,name:'ad3',client:'c3'},
  ] ;


  constructor(
    private dialogRef: MatDialogRef<CreateEditAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.filteredads = this.ads;
  }

  filterAds() {
    this.filteredads = this.ads.filter((ad) =>
      ad.toLowerCase().includes(this.adSearch.toLowerCase()),
    );
  }

  selectAd(ad: any) {
    const selected = this.ads.find(c => c.name === ad)
    this.form.ad = selected ? selected.id : null;
    this.form.client=selected?selected.client:null
    console.log(this.form);
    
  }

  validateAmt(value: string) {
    const regex = /^\d+(\.\d+)?$/;

  if (!regex.test(value) || Number(value) <= 0) {
    this.AmtNumber = true;

    // remove non numeric characters except dot
    this.form.amount = value.replace(/[^0-9.]/g, '');

  } else {
    this.AmtNumber = false;
  }
  }

  close() {
    this.dialogRef.close();
  }
}
