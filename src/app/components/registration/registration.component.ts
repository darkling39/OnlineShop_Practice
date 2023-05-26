import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;

  constructor(private route: Router, private auth: AuthService) {}

  submitRegistration() {
    this.auth.register(this.registrationForm.value);
    this.route.navigate(['login']);
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
    });
    if (this.auth.isLoggedIn()) {
      this.route.navigate(['admin']);
    }
  }
}
