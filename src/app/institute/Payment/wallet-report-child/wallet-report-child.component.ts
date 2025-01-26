import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-wallet-report-child',
  templateUrl: './wallet-report-child.component.html',
  styleUrls: ['./wallet-report-child.component.css']
})
export class WalletReportChildComponent implements OnInit {
transactions: any
  logindata = {
    inst_id: '',
    parent_center_id: '',
    addmission_fee: 0
  }
  getAddmissionStd = 0
  totalAmount: number = 0; // Example balance

  constructor(
    private _crud: ManageService,
    private dialog: MatDialog
  ) {
    const data = localStorage.getItem('Token')
    if (data) {
      this.logindata = JSON.parse(data)
    }

  }
  ngOnInit() {
    this.getWalletBySender()
    this.getCurrentAmount()
  }

  getCurrentAmount() {
    this._crud.getCueentAmount(this.logindata.inst_id).subscribe(
      (res: any) => {
        console.log(res.data);
        this.totalAmount = res.data.amount
        this.getAddmissionStd = Math.floor(this.totalAmount / this.logindata.addmission_fee)
      }
    )
  }

  getWalletBySender() {
    this._crud.GetwalletBySenderId(this.logindata.inst_id).subscribe(
      (res: any) => {
        console.log(res);
        this.transactions = res.data
      }
    )
  }


}
