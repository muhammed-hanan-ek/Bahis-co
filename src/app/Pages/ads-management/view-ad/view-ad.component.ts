import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
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
import { SharedService } from '../../../shared/shared.service';
import { ApiUrl } from '../../../app.contsant';

@Component({
  selector: 'app-view-ad',
  imports: [NgxPaginationModule, CommonModule, FormsModule],
  templateUrl: './view-ad.component.html',
  styleUrl: './view-ad.component.css',
})
export class ViewAdComponent implements OnInit{
  @HostListener('document:click', ['$event'])
onDocumentClick(event: Event) {
  const clickedInside = (event.target as HTMLElement).closest('.menu-container');

  if (!clickedInside) {
    this.activeMenu = null;
  }
}
  slno:number|null=null
  conversions: any[] = [];
  activeMenu: any = null;
  ad:string=''
  spend:any;
  userRole:any;
  ApiUrl=ApiUrl

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
    private shared:SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service:BACService,
            private toastr:ToastrService,
            private loader:LoaderService,
            private confirmSevice:ConfirmationService
  ) {}

  ngOnInit(): void {
    this.shared.Role$.subscribe({
      next:(res)=>{
        this.userRole=res
      }
    })
      this.slno=this.data.slno

       this.onload()
  }

  toggleMenu(index: number, event: Event) {
  event.stopPropagation(); // ✅ prevents closing immediately
  this.activeMenu = this.activeMenu === index ? null : index;
}

  editConversion(isEdit: boolean, slno: any) {
    const dialogRef=this.dialog.open(CreateEditConversionComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'responsive-dialog',
      data: {
        isEdit,
        slno,
      },
    });

     dialogRef.afterClosed().subscribe({
      next: () => {
        this.onload()
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
  pdf(){
    this.loader.showLoader()
    this.service.conversionPdf(this.slno).subscribe({
      next:(res)=>{
        console.log(res);
        
       if (res && res.filename) {
                             window.open(`${ApiUrl}/uploads/PDF/${res.filename}`);
                         } else {
                             this.toastr.error('PDF Export Failed');
                         }
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
  excel(){
    this.loader.showLoader()
    this.service.conversionexcel(this.slno).subscribe({
      next:(res)=>{
        console.log(res);
        
       if (res && res.filename) {
                      window.open(`${ApiUrl}/uploads/excel/${res.filename}`);
                  } else {
                      this.toastr.error('excel Export Failed');
                  }
  
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

  
   async deleteaConversion(SLNO:any){
    

    const ok = await this.confirmSevice.open({
      title: 'Delete Conversion',
      message: 'Are you sure you want to delete this conversion?',
      type: 'danger',
      confirmText: 'Delete',
    });

    if (!ok) return;
    this.loader.showLoader()
    this.service.Deleteconversion(SLNO).subscribe({
      next: (res) => {
        if(res.data[0].MSG=='Success'){
          this.toastr.success('Conversion deleted successfully','Successful')
          this.onload()
        }
      },
      error: (err) => {

        console.log(err);

        this.toastr.error(
          'An error occurred while deleting conversion. Please try again.',
          'Error'
        );

        this.loader.hideLoader();
      },
      complete: () => {
        this.loader.hideLoader();
      }
    });
    
    
  
  }

  close() {
    this.dialogRef.close();
  }
}
