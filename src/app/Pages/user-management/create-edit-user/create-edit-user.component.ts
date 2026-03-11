import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-user',
  imports: [FormsModule,CommonModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css'
})
export class CreateEditUserComponent implements OnInit{

  isEdit:boolean=false
  show:boolean=false
  profileImage: any;

  constructor(
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit(): void {
      this.isEdit=this.data.isEdit

      
  }

  

  close(){
    this.dialogRef.close()
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
}
