import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseBase } from 'src/app/shared/models/responseBase';
import { UserCorporationResponse } from '../../models/userCorporation.models';
import { CorporationService } from '../../services/corporation.service';

@Component({
  selector: 'app-user-corporations-page',
  templateUrl: './user-corporations-page.component.html'
})
export class UserCorporationsPageComponent implements OnInit {
  public form!: FormGroup;
  public userCorporations!: UserCorporationResponse[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private corporationService: CorporationService) { }

  ngOnInit(): void {
    this.loadUserCorporations();
    this.setForm();
  }

  loadUserCorporations(): void{
    this.corporationService.getCorporations()
      .subscribe(
        (data: UserCorporationResponse[]) => {
          this.userCorporations = data;
        },
        (error) => console.log(error));
  }

  createCorporation(): void {
    this.corporationService.createCorporation(this.form.value)
      .subscribe(
        (data: ResponseBase<any>) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/corporacao']);

          if (data.success) {
            this.toastr.success(data.message, 'Notificação');
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

  private setForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required
      ])],
    })
  }
}
