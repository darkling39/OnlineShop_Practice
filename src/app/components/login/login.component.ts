import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: Router,
    public auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  loginForm!: FormGroup;
  openSnackBar() {
    this.snackBar.open('Failed to login', ' X ');
  }
  submitLogin() {
    this.auth.logIn(this.loginForm.value);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
    });
    if (this.auth.isLoggedIn()) {
      this.route.navigate(['house/h-home']);
    }
  }
}
