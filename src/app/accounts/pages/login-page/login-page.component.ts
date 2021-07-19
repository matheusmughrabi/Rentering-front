import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from 'src/app/accounts/models/login.models';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { AccountsService } from 'src/app/accounts/services/accounts.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private accountsService: AccountsService) {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],

      password: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
  }

  ngOnInit(): void {
  }

  login(): void {
    this.accountsService.login(this.form.value)
      .subscribe(
        (data: ResponseBase<LoginResponse>) => {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('username', data.data.username)
          localStorage.setItem('role', data.data.role)

          console.log(data);
        },
        (error) => console.log(error)
        );
  }
}
