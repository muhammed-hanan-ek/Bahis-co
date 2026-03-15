import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationService } from '../../../confirmation/confirmation.service';
import { BACService } from '../../../Service/bac.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../loader/loader.service';

@Component({
  selector: 'app-create-edit-work',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-edit-work.component.html',
  styleUrl: './create-edit-work.component.css',
})
export class CreateEditWorkComponent implements OnInit{
  isEdit: boolean = false;
  clientSearch: any = '';

  filteredClients: any[] = [];

  form: {
  title: string;
  description: string;
  client: number | null;
  driveLink: string;
} = {
  title: '',
  description: '',
  client: null,
  driveLink: '',
};

  clients = [{name:'Anu Hanan',id:2}];

  constructor(
    private dialogRef: MatDialogRef<CreateEditWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmService:ConfirmationService,
    private service:BACService,
    private toastr:ToastrService,
    private loader:LoaderService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.filteredClients = this.clients;

     if (this.form.client) {
    const client = this.clients.find(c => c.id === this.form.client);
    this.clientSearch = client ? client.name : '';
  }
  }

  // dropdown

  filterClients() {
    this.filteredClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(this.clientSearch.toLowerCase()),
    );
  }

  selectClient(client: any) {
  const selected = this.clients.find(c => c.name === client);
  this.form.client = selected ? selected.id : null;

  console.log(this.form);
}

  close() {
    this.dialogRef.close();
  }

  async savework(){
    const ok = await this.confirmService.open({
      title: this.isEdit?'Save Changes':'Create Work',
      message: this.isEdit?'Are you sure you want to Edit this work?':'Are you sure you want to create work?',
      type:  this.isEdit?'info':'success',
      confirmText:  'Confirm',
    });

    if (!ok) return;

    this.loader.showLoader()
    this.service.addWork(this.form.title,this.form.client,this.form.description,this.form.driveLink).subscribe({
      next:(res)=>{
        if(res.data=='success'){
          this.toastr.success('User added successfully.','Successful')
        }
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('An error occurred while adding work. Please try again.','Error')
      },
      complete:()=>{
        this.loader.hideLoader()
        this.close()
      }
    })
  }
}
