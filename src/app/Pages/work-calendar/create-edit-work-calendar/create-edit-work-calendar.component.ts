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
  selector: 'app-create-edit-work-calendar',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-edit-work-calendar.component.html',
  styleUrl: './create-edit-work-calendar.component.css'
})
export class CreateEditWorkCalendarComponent {

  isEdit: boolean = false;
  slno: any = null;

  clientSearch: any = '';
  filteredClients: any[] = [];
  clients: any[] = [];

  form = {
    title: '',
    content: '',
    client: null as number | null,
    date: '',
  };


  constructor(
    private dialogRef: MatDialogRef<CreateEditWorkCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmService: ConfirmationService,
    private service: BACService,
    private toastr: ToastrService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.slno = this.data.slno;

    this.load();
  }

  // ================= CLIENT =================
  filterClients() {
    this.filteredClients = this.clients.filter((client) =>
      client.Client.toLowerCase().includes(this.clientSearch.toLowerCase())
    );
  }

  selectClient(client: any) {
    const selected = this.clients.find(c => c.Client === client);
    this.form.client = selected ? selected.id : null;
  }



  // ================= SAVE =================
  async savework() {
    const ok = await this.confirmService.open({
      title: this.isEdit ? 'Save Changes' : 'Create Work',
      message: this.isEdit
        ? 'Are you sure you want to Edit this work?'
        : 'Are you sure you want to create work?',
      type: this.isEdit ? 'info' : 'success',
      confirmText: 'Confirm',
    });

    if (!ok) return;

  

    this.loader.showLoader();

   
  }

  // ================= LOAD (🔥 FULL FIX) =================
  load() {
    
  }

  close() {
    this.dialogRef.close();
  }
}