import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterResponse } from 'src/app/accounts/models/register.models';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { LoginResponse } from '../../models/login.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.setFormGroup();
  }

  signUp(): void {
    this.accountsService.createAccount(this.form.value)
      .subscribe(
        (data: ResponseBase<RegisterResponse>) => {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('username', data.data.username)
          localStorage.setItem('role', data.data.role)

          this.router.navigate(['/contratos']);
        },
        (error) => console.log(error)
      );
  }

  private setFormGroup(): void{
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
}
