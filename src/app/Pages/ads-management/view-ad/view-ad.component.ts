import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateEditConversionComponent } from '../create-edit-conversion/create-edit-conversion.component';
import { BACService } from '../../../Service/bac.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../loader/loader.service';
import { ConfirmationService } from '../../../confirmation/confirmation.service';

@Component({
  selector: 'app-view-ad',
  imports: [NgxPaginationModule, CommonModule, FormsModule],
  templateUrl: './view-ad.component.html',
  styleUrl: './view-ad.component.css',
})
export class ViewAdComponent implements OnInit{
  slno:number|null=null
  conversions: any[] = [];
  activeMenu: any = null;
  ad:string=''
  spend:any;

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
    private service:BACService,
            private toastr:ToastrService,
            private loader:LoaderService,
            private confirmSevice:ConfirmationService
  ) {}

  ngOnInit(): void {
      this.slno=this.data.slno

       this.onload()
  }

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

  onload(){
    this.loader.showLoader()
    this.service.viewad(this.slno).subscribe({
      next:(res)=>{
        console.log(res);
        
       this.ad=res.data[0][0].adName
       this.conversions=res.data[1]
       this.spend=res.data[2][0].spend
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('An error occurred while loading works. Please try again.','Error')
      },
      complete:()=>{
        this.loader.hideLoader()
      }
    })
  }

  get count(){
   return this.conversions.reduce((sum, c) => sum + (c.count || 0), 0);
  }
  get Revenue(){
   return this.conversions.reduce((sum, c) => sum + (c.amount || 0), 0);
  }

  close() {
    this.dialogRef.close();
  }
}
