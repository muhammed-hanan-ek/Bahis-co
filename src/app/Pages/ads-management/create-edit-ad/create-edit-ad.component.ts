import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LoaderService } from '../../../loader/loader.service';
import { BACService } from '../../../Service/bac.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from '../../../confirmation/confirmation.service';

@Component({
  selector: 'app-create-edit-ad',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-edit-ad.component.html',
  styleUrl: './create-edit-ad.component.css',
})
export class CreateEditAdComponent implements OnInit {
  slno:number|null=null
  isEdit: boolean = false;
  AmtNumber: boolean = false;
  adSearch: any = null;
  filteredads: any[] = [];
  form:{
    ad: number |null,
    client: string |null,
    startDate: string |null,
    endDate: string |null,
    amount: string |null
  } = {
    ad: null,
    client: '',
    startDate: '',
    endDate: '',
    amount: '',
  };

  ads:any[] =[] ;


  constructor(
    private dialogRef: MatDialogRef<CreateEditAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loader:LoaderService,
    private service:BACService,
    private toastr:ToastrService,
    private confirmService:ConfirmationService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.slno = this.data.slno;
    this.filteredads = this.ads;

    this.onLoad()
    console.log(this.ads);
    
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

  onLoad(){
    this.service.LoadAd(this.slno).subscribe({
      next:(res)=>{
       this.ads = res.data[0];
this.filteredads = this.ads;

const adData = res.data[1][0];

this.form.ad = adData?.AD;
this.form.amount = adData?.AMOUNT;
this.form.startDate = this.formatDate(adData?.START_DATE);
this.form.endDate = this.formatDate(adData?.END_DATE);

// 🔥 IMPORTANT
const selected = this.ads.find(c => c.id === this.form.ad);

if (selected) {
  this.adSearch = selected.name;   // ✅ this binds to input
  this.form.client = selected.client;
}
        
      },
      error:(err)=>{
        console.log(err);
        
         this.toastr.error(
            'An error occurred while loading ad. Please try again.',
            'Error'
          );
      },
      complete:()=>{
        this.loader.hideLoader()
      }
    })
  }
  formatDate(date: any) {
  if (!date) return null;

  const d = new Date(date);
  return d.toISOString().split('T')[0]; // ✅ YYYY-MM-DD
}


    async saveAd(){
    const ok = await this.confirmService.open({
      title: this.isEdit?'Save Changes':'Create Ad',
      message: this.isEdit?'Are you sure you want to Edit this ad?':'Are you sure you want to create ad?',
      type:  this.isEdit?'info':'success',
      confirmText:  'Confirm',
    });

    if (!ok) return;

    this.loader.showLoader()
    this.service.SaveAd(this.slno,this.form.ad,this.form.startDate,this.form.endDate,this.form.amount).subscribe({
      next:(res)=>{
        console.log(res);
        
        if(res.data[0].MSG=='success'){
          this.toastr.success(this.isEdit?'Ad edited successfully.':'Ad created successfully','Successful')
        }
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error(this.isEdit?'An error occurred while editing ad. Please try again.':'An error occurred while creating ad. Please try again.','Error')
      },
      complete:()=>{
        this.loader.hideLoader()
        this.close()
      }
    })
  }

  


  close() {
    this.dialogRef.close();
  }
}
