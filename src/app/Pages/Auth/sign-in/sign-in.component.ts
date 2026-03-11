import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  signIn() {
    if (this.username && this.password) {
      console.log('username:', this.username, ',password:', this.password);
      this.router.navigate(['/user-management']);
    }
  }
}
