import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BACService } from '../../../Service/bac.service';
import { LoaderService } from '../../../loader/loader.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  show: boolean = false;
  username: any = null;
  password: any = null;

  constructor(
    private router: Router,
    private toastr:ToastrService,
    private service:BACService,
    private loader:LoaderService
  ) {}

  ngOnInit(): void {}

  signIn() {

  if (this.username && this.password) {

    this.loader.showLoader();

    this.service.userLogin(this.username,this.password).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/user-management']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(
          'An error occurred while logging in. Please try again.',
          'Error'
        );
        this.loader.hideLoader();
      },
      complete: () => {
        this.loader.hideLoader();
        this.toastr.success('You have successfully logged in.','Successful')
      }
    });

  }
}
}
