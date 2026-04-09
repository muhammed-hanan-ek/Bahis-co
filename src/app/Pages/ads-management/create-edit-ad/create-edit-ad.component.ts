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
  selector: 'app-create-edit-ad',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './create-edit-ad.component.html',
  styleUrl: './create-edit-ad.component.css',
})
export class CreateEditAdComponent implements OnInit {
  slno: number | null = null;
  isEdit: boolean = false;
  AmtNumber: boolean = false;
  clientSearch: any = null;
  filteredClients: any[] = [];
  form: {
    ad: string | null;
    client: number | null;
    startDate: string | null;
    endDate: string | null;
    amount: string | null;
    link: string | null;
  } = {
    ad: '',
    client: null,
    startDate: '',
    endDate: '',
    amount: '',
    link: '',
  };

  clients: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateEditAdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loader: LoaderService,
    private service: BACService,
    private toastr: ToastrService,
    private confirmService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.slno = this.data.slno;
    this.filteredClients = this.clients;

    this.onLoad();
  }

  filterClients() {
    this.filteredClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(this.clientSearch.toLowerCase()),
    );
  }

  selectClient(client: any) {
    const selected = this.clients.find((c) => c.name === client);
    this.form.client = selected ? selected.client : null;
  }
  validateAmt(value: string) {
    const regex = /^\d+(\.\d+)?$/;

    if (!regex.test(value) || Number(value) <= 0) {
      this.AmtNumber = true;

      // remove non numeric characters except dot
      this.form.amount = value.replace(/[^0-9.]/g, '');
    } else {
      this.AmtNumber = false;
    }
  }

  onLoad() {
    this.service.LoadAd(this.slno).subscribe({
      next: (res) => {
        this.clients = res.data[0];
        this.filteredClients = this.clients;

        const adData = res.data[1][0];

        this.form.ad = adData?.AD;
        this.form.amount = adData?.AMOUNT;
        this.form.client = adData?.CLIENT;
        this.form.link = adData?.LINK;
        this.form.startDate = this.formatDate(adData?.START_DATE);
        this.form.endDate = this.formatDate(adData?.END_DATE);

        // 🔥 IMPORTANT
        const selected = this.clients.find(
          (c) => c.client === this.form.client,
        );

        if (selected) {
          this.clientSearch = selected.name; // ✅ this binds to input
          this.form.client = selected.client;
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
  formatDate(date: any) {
    if (!date) return null;

    const d = new Date(date);
    return d.toISOString().split('T')[0]; // ✅ YYYY-MM-DD
  }

  async saveAd() {
    const ok = await this.confirmService.open({
      title: this.isEdit ? 'Save Changes' : 'Create Ad',
      message: this.isEdit
        ? 'Are you sure you want to Edit this ad?'
        : 'Are you sure you want to create ad?',
      type: this.isEdit ? 'info' : 'success',
      confirmText: 'Confirm',
    });

    if (!ok) return;

    this.loader.showLoader();
    this.service
      .SaveAd(
        this.slno,
        this.form.ad,
        this.form.startDate,
        this.form.endDate,
        this.form.amount,
        this.form.client,
        this.form.link,
      )
      .subscribe({
        next: (res) => {
          if (res.data[0].MSG == 'success') {
            this.toastr.success(
              this.isEdit
                ? 'Ad edited successfully.'
                : 'Ad created successfully',
              'Successful',
            );
          }
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(
            this.isEdit
              ? 'An error occurred while editing ad. Please try again.'
              : 'An error occurred while creating ad. Please try again.',
            'Error',
          );
        },
        complete: () => {
          this.loader.hideLoader();
          this.close();
        },
      });
  }

  close() {
    this.dialogRef.close();
  }
}
