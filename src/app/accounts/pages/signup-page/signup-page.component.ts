import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterResponse } from 'src/app/accounts/models/register.models';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { AccountsService } from 'src/app/accounts/services/accounts.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit {
  public form: FormGroup;

  constructor(private accountsService: AccountsService, private fb: FormBuilder) { 
    this.form = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])],

      lastName: ['', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])],

      email: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],

      username: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],

      password: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],

      confirmPassword: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.accountsService.createAccount(this.form.value)
      .subscribe(
        (data: ResponseBase<RegisterResponse>) => {
          console.log(data);
        },
        (error) => console.log(error)
        );
  }
}
