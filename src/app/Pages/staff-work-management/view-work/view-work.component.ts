import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BACService } from '../../../Service/bac.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../loader/loader.service';

@Component({
  selector: 'app-view-work',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './view-work.component.html',
  styleUrl: './view-work.component.css',
})
export class ViewWorkComponent implements OnInit {
  slno: number | null = null;
  userRole: string | null = null;
  clients: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<ViewWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: BACService,
    private toastr: ToastrService,
    private loader: LoaderService,
  ) {}

  ngOnInit(): void {
    this.userRole = this.data.userRole;
    this.slno = this.data.slno;
    this.work.status = this.data.status;

    this.load();
  }

  work: {
    title: string;
    description: string;
    client: number | null;
    driveLink: string;
    remark: string;
    status: string;
  } = {
    title: '',
    description: '',
    client: null,
    driveLink: '',
    remark: '',
    status: '',
  };

  copyLink(link: any) {
    navigator.clipboard.writeText(link);
  }

  openLink(link: any) {
    window.open(link, '_blank');
  }

  close() {
    this.dialogRef.close();
  }

  load() {
    this.service.LoadEditWork(this.slno).subscribe({
      next: (res) => {
        console.log(res, 'work');

        this.clients = res.data[1];
        const client = this.clients.find((c) => c.id == res.data[0][0].client);
        this.work.client = client ? client.Client : '';
        this.work.description=res.data[0][0].description
        this.work.driveLink=res.data[0][0].link
        this.work.title=res.data[0][0].title

      },
      error: (err) => {
        console.log(err);

        this.toastr.error(
          'An error occurred while loading user. Please try again.',
          'Error',
        );

        this.loader.hideLoader();
      },
      complete: () => {
        this.loader.hideLoader();
      },
    });
  }
}
