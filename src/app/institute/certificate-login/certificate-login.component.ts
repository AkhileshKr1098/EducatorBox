import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-certificate-login',
  templateUrl: './certificate-login.component.html',
  styleUrls: ['./certificate-login.component.css']
})
export class CertificateLoginComponent implements OnInit {
  hide = true;
  deletevalue = 1
  sendotp: boolean = true
  inst_login_form !: FormGroup
  send_otp: any
  constructor(
    private popup: NgToastService,
    private FromBuilder: FormBuilder,
    private service: ManageService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.inst_login_form = this.FromBuilder.group({
      username: ['', Validators.required],
      inst_password: ['', Validators.required],
      otp: [''],
    })

  }

  inst_login() {
    if (this.inst_login_form.valid) {
      this.service.inst_login(this.inst_login_form.value).subscribe(
        (res: any) => {
          if (res.success) {
            this.sendOTP()
            // this.popup.success({ detail: 'Success', summary: 'OTP send successfully ...', })
          }
          else {
            this.popup.error({ detail: 'Failed', summary: 'plz Contact EducatorBox Help Center' })
          }
        },
        (error: any) => {
          this.popup.error({ detail: 'Failed', summary: 'Username and Password Not Match...' })
        }
      )
    }
    else {
      this.popup.error({ detail: 'Failed', summary: 'Account Not Found...' })
    }
  }


  sendOTP() {
    this.send_otp = Math.floor(100000 + Math.random() * 900000);
    console.log(this.send_otp);

    const formdata = new FormData()
    formdata.append("send_otp", this.send_otp);
    formdata.append("tomail", this.inst_login_form.get('username')?.value)
    this.service.inst_reg_otp(formdata).subscribe(
      (res: any) => {
        if (res.success) {
          this.popup.success({ detail: 'Success', summary: 'OTP Send On Email', })
          this.sendotp = false
        }
        else {
          this.popup.error({ detail: 'Fail', summary: 'OTP Send Fail...', })
        }
      }
    )
  }


  Verify(data: any) {
    if (this.send_otp == data) {
      this.router.navigate(['/institutehome/certificate']);
      this.service.certificateLogin.next(true)
    } else {
      alert("Invalid OTP")
    }
  }


}
