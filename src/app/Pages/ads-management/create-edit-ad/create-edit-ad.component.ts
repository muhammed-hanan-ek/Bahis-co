import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-edit-ad',
  imports: [FormsModule,CommonModule,MatAutocompleteModule,MatInputModule],
  templateUrl: './create-edit-ad.component.html',
  styleUrl: './create-edit-ad.component.css'
})
export class CreateEditAdComponent implements OnInit{
    isEdit:boolean=false
    AmtNumber:boolean=false;
    clientSearch:any = null;
    filteredClients:any[]=[]
    form={
      title:null,
      client:null,
      startDate:null,
      endDate:null,
      amount:''
    }

    clients = [
   'Bahis & Co',
  'ABC Consultancy' ,
 'TechNova' 
];

  constructor(
    private dialogRef:MatDialogRef<CreateEditAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ){}

  ngOnInit(): void {
      this.isEdit=this.data.isEdit
      this.filteredClients = this.clients;
  }

  filterClients(){

this.filteredClients = this.clients.filter(client =>
client.toLowerCase().includes(this.clientSearch.toLowerCase())
);

}

selectClient(client:any){
this.form.client = client.id;
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

  close(){
    this.dialogRef.close();
  }

}
