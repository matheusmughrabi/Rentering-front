import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { Router } from '@angular/router';
import { Security } from 'src/app/shared/security/security.util';
import { ToastrService } from 'ngx-toastr';
import { UserInfoQueryResult } from '../../models/queryResults/userInfo.queryResult';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.setFormGroup();
  }

  signUp(): void {
    this.accountsService.createAccount(this.form.value)
      .subscribe(
        (data: ResponseBase<UserInfoQueryResult>) => {
          if (data.success) {
            Security.setLogin(data.data.username, data.data.role, data.data.token);
            this.router.navigate(['/contratos']);
            this.toastr.success(data.message, 'Notificação');
          } 
          else {
            data.notifications.forEach(c => this.toastr.warning(c.message, c.title));
          }

        },
        (error) => console.log(error)
      );
  }

  private setFormGroup(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],

      lastName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],

      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],

      username: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],

      password: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],

      confirmPassword: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])]
    })
  }
}
