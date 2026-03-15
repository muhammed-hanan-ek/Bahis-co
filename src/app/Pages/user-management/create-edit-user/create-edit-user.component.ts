import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationService } from '../../../confirmation/confirmation.service';
import { LoaderService } from '../../../loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { BACService } from '../../../Service/bac.service';

@Component({
  selector: 'app-create-edit-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css',
})
export class CreateEditUserComponent implements OnInit {
  isEdit: boolean = false;
  slno:any=null
  show: boolean = false;
  profileImage: any;
  username:string|null=null;
  fullname:string|null=null;
  email:string|null=null;
  password:string|null=null;
  role:number|null=null
  roles:any[]=[
    {id:1,name:'Admin'},
    {id:2,name:'Client'},
    {id:3,name:'Staff'},
  ]



  constructor(
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmService:ConfirmationService,
    private loader:LoaderService,
    private toastr:ToastrService,
    private service:BACService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.slno=this.data.slno
  }

  close() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.profileImage = reader.result;
    };

    reader.readAsDataURL(file);
  }

  async save(){
    const ok = await this.confirmService.open({
      title: this.isEdit?'Save Changes':'Create User',
      message: this.isEdit?'Are you sure you want to Edit this user?':'Are you sure you want to create user?',
      type:  this.isEdit?'info':'success',
      confirmText:  'Confirm',
    });

    if (!ok) return;

    this.loader.showLoader();
    this.service.addUser(this.username,this.password,this.role,this.email,this.fullname).subscribe({
      next:(res)=>{
        if(res.data=='success'){
          this.toastr.success('User added successfully.','Successful')
        }
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('An error occurred while adding user. Please try again.','Error')
      },
      complete:()=>{
        this.close()
        this.loader.hideLoader()
        
      }
    })
  }
}
