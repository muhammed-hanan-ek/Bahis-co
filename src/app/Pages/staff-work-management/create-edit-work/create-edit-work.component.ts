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
  standalone: true,
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-edit-work.component.html',
  styleUrl: './create-edit-work.component.css',
})
export class CreateEditWorkComponent implements OnInit {
  isEdit: boolean = false;
  slno: any = null;

  clientSearch: any = '';
  filteredClients: any[] = [];
  clients: any[] = [];

  form = {
    title: '',
    description: '',
    client: null as number | null,
    driveLink: '',
  };

  // ✅ WORK ASSIGNMENTS (MAIN STRUCTURE)
  workAssignments: any[] = [];

  employees: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateEditWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmService: ConfirmationService,
    private service: BACService,
    private toastr: ToastrService,
    private loader: LoaderService,
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.slno = this.data.slno;

    this.load();
  }

  // ================= CLIENT =================
  filterClients() {
    this.filteredClients = this.clients.filter((client) =>
      client.Client.toLowerCase().includes(this.clientSearch.toLowerCase()),
    );
  }

  selectClient(client: any) {
    const selected = this.clients.find((c) => c.Client === client);
    this.form.client = selected ? selected.id : null;
  }

  // ================= EMPLOYEE =================
  filterEmployees(index: number) {
    const search = (
      this.workAssignments[index].employeeSearch || ''
    ).toLowerCase();

    this.workAssignments[index].filteredEmployees = this.employees.filter((e) =>
      e.name.toLowerCase().includes(search),
    );
  }

  selectEmployee(value: string, index: number) {
    const emp = this.employees.find((e) => e.name === value);

    if (emp) {
      this.workAssignments[index].employee = emp.id;
      this.workAssignments[index].employeeSearch = emp.name;
    }
  }

  // ================= ADD / REMOVE =================
  addAssignment() {
    this.workAssignments.push({
      tag: '',
      employee: null,
      employeeSearch: '',
      filteredEmployees: [...this.employees],
    });
  }

  removeAssignment(index: number) {
    this.workAssignments.splice(index, 1);
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

    const assignments = this.workAssignments.map((a) => ({
      tag: a.tag,
      employeeId: a.employee,
    }));

    this.loader.showLoader();

    this.service
      .addWork(
        this.form.title,
        this.form.client,
        this.form.description,
        this.form.driveLink,
        this.slno,
        assignments,
      )
      .subscribe({
        next: (res) => {
          if (res.data == 'success') {
            this.toastr.success(
              this.isEdit
                ? 'Work edited successfully.'
                : 'Work added successfully',
              'Successful',
            );
          }
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(
            this.isEdit
              ? 'An error occurred while editing work.'
              : 'An error occurred while adding work.',
            'Error',
          );
        },
        complete: () => {
          this.loader.hideLoader();
          this.close();
        },
      });
  }

  // ================= LOAD (🔥 FULL FIX) =================
  load() {
    this.loader.showLoader();

    this.service.LoadEditWork(this.slno).subscribe({
      next: (res) => {
        this.clients = res.data[1] || [];
        this.filteredClients = this.clients;

        this.employees = res.data[2] || [];

        const tags = res.data[3] || [];

        // ✅ FIX: Replace workAssignments completely
        this.workAssignments = tags.length
          ? tags.map((t: any) => {
              const emp = this.employees.find((e) => e.id == t.USR_SLNO);

              return {
                tag: t.TE_TAG || '',
                employee: t.USR_SLNO || null,
                employeeSearch: emp ? emp.name : '',
                filteredEmployees: [...this.employees],
              };
            })
          : [
              {
                tag: '',
                employee: null,
                employeeSearch: '',
                filteredEmployees: [...this.employees],
              },
            ];

        // FORM DATA
        this.form.client = res.data[0][0]?.client;
        this.form.description = res.data[0][0]?.description;
        this.form.driveLink = res.data[0][0]?.link;
        this.form.title = res.data[0][0]?.title;

        if (this.form.client) {
          const client = this.clients.find((c) => c.id == this.form.client);
          this.clientSearch = client?.Client || '';
        }
      },

      error: (err) => {
        console.log(err);
        this.toastr.error('An error occurred while loading work.', 'Error');
        this.loader.hideLoader();
      },

      complete: () => {
        this.loader.hideLoader();
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
