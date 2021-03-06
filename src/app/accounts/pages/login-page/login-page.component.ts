import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Security } from 'src/app/shared/security/security.util';
import { UserInfoQueryResult } from '../../models/queryResults/userInfo.queryResult';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public busy: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.prepareLoginForm();
  }

  login(): void {
    this.busy = true;

    this.accountsService.login(this.form.value)
      .subscribe(
        (data: ResponseBase<UserInfoQueryResult>) => {
          if (data.success) {
            Security.setLogin(data.data.username, data.data.role, data.data.token);
            this.router.navigate(['/contratos']);
            this.busy = false;
          }
          else {
            data.notifications.forEach(c => this.toastr.warning(c.message, c.title));
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private prepareLoginForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],

      password: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])]
    })
  }
}
