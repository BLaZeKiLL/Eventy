import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../event/event.service';

@Component({
  selector: 'eventy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  authenticationFlag = true;
  hide = true;

  constructor(
    private auth: AuthService,
    private event: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] }),
      keep: new FormControl()
    });
  }

  login() {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe((status) => {
      if (status) {
        this.event.loadEvents();
        this.router.navigate(['/', 'eventboard']);
      } else {
        this.authenticationFlag = false;
      }
    });
  }

  signup() {
    this.auth.signup(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe((status) => {
      if (status) {
        this.event.loadEvents();
        this.router.navigate(['/', 'eventboard']);
      } else {
        this.authenticationFlag = false;
      }
    });
  }
}