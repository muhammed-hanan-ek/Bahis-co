import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-edit-work',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-edit-work.component.html',
  styleUrl: './create-edit-work.component.css',
})
export class CreateEditWorkComponent {
  isEdit: boolean = false;
  clientSearch: any = '';

  filteredClients: any[] = [];

  form = {
    title: '',
    description: '',
    client: null,
    driveLink: '',
  };

  clients = ['Bahis & Co', 'ABC Consultancy', 'TechNova'];

  constructor(
    private dialogRef: MatDialogRef<CreateEditWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.filteredClients = this.clients;
  }

  // dropdown

  filterClients() {
    this.filteredClients = this.clients.filter((client) =>
      client.toLowerCase().includes(this.clientSearch.toLowerCase()),
    );
  }

  selectClient(client: any) {
    this.form.client = client.id;
  }

  close() {
    this.dialogRef.close();
  }
}
