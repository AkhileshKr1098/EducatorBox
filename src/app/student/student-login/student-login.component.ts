import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { StdRegComponent } from '../std-reg/std-reg.component';
import { NgToastService } from 'ng-angular-popup';
import { StdChnangePwdComponent } from '../std-chnange-pwd/std-chnange-pwd.component';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  hide = true
  stdloginform !: FormGroup
  constructor(
    private popup: NgToastService,
    private dailog: MatDialog,
    private FromBuilder: FormBuilder,
    private service: ManageService,
    private Router: Router
  ) {
    localStorage.removeItem
    localStorage.clear()
  }

  ngOnInit(): void {
    this.stdloginform = this.FromBuilder.group({
      username: ['', Validators.required],
      std_password: ['', Validators.required],
    })
  }

  new_account(): any {
    this.dailog.open(StdRegComponent, {
      disableClose: true
    })
    localStorage.removeItem
    localStorage.clear()
  }
  std_forgot_password(): any {
    this.dailog.open(StdChnangePwdComponent, {
      disableClose: true
    })
  }

  Std_login() {
    if (this.stdloginform.valid) {
      this.service.std_login(this.stdloginform.value).subscribe(
        (res: any) => {
          if (res.success) {
            if (res.uid[0].status != 0) {
              localStorage.setItem('Token', JSON.stringify(res.uid[0]));
              this.Router.navigate(['/studenthome']);
              this.popup.success({ detail: 'Success', summary: 'Login Success...', })
            }
            else {
              this.popup.error({ detail: 'Account is disabled', summary: 'Please contact your Institute' })
            }

          }
          else {
            this.popup.error({ detail: 'Failed', summary: 'Username or password are invalid'})
          }
        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Failed', summary: 'Username or password are invalid' })
        }
      )
    }
    else {
      this.popup.error({ detail: 'Failed', summary: 'Fill required fields', })
    }

  }

}