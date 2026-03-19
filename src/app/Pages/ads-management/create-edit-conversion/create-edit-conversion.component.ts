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
  selector: 'app-create-edit-conversion',
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-edit-conversion.component.html',
  styleUrl: './create-edit-conversion.component.css',
})
export class CreateEditConversionComponent implements OnInit {
  slno:number | null=null
  isEdit: boolean = false;
  AmtNumber: boolean = false;
  AdSearch: any = null;
  ads: any[] = [];
  filteredads: any[] = [];
  form: any = {};

  constructor(
    private dialogRef: MatDialogRef<CreateEditConversionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loader: LoaderService,
    private service: BACService,
    private toastr: ToastrService,
    private confirmService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.slno = this.data.slno;

    this.onLoad()
  }

  filterads() {
    this.filteredads = this.ads.filter((ad) =>
      ad.toLowerCase().includes(this.AdSearch.toLowerCase()),
    );
  }

  selectad(ad: any) {
    const selected = this.ads.find((c) => c.name === ad);
    this.form.ad = selected ? selected.id : null;
    console.log(this.form);
    
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

  onLoad() {
    this.service.LoadConvesrion(this.slno).subscribe({
      next: (res) => {
        console.log(res);

        this.ads=res.data[0]
        this.filteredads=this.ads
        this.form.ad=res.data[1][0].ad
        this.form.converioncount=res.data[1][0].count
        this.form.amount=res.data[1][0].amount
        const selected = this.ads.find(c => c.id === this.form.ad);

if (selected) {
  this.AdSearch = selected.name; 

}
      },
      error: (err) => {
        console.log(err);

        this.toastr.error(
          'An error occurred while loading ad. Please try again.',
          'Error',
        );
      },
      complete: () => {
        this.loader.hideLoader();
      },
    });
  }

      async saveconversion(){
    const ok = await this.confirmService.open({
      title: this.isEdit?'Save Changes':'Add Conversion',
      message: this.isEdit?'Are you sure you want to Edit this conversion?':'Are you sure you want to create conversion?',
      type:  this.isEdit?'info':'success',
      confirmText:  'Confirm',
    });

    if (!ok) return;

    this.loader.showLoader()
    this.service.SaveConversion(this.slno,this.form.ad,this.form.converioncount,this.form.amount).subscribe({
      next:(res)=>{
        console.log(res);
        
        if(res.data[0].MSG=='success'){
          this.toastr.success(this.isEdit?'Conversion edited successfully.':'Conversion added successfully','Successful')
        }
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error(this.isEdit?'An error occurred while editing conversion. Please try again.':'An error occurred while adding conversion. Please try again.','Error')
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
