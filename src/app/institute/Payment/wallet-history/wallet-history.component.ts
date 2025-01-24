import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddMoneyComponent } from '../add-money/add-money.component';

@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.css']
})
export class WalletHistoryComponent implements OnInit {
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
    this.getWalletBySender()
    this.getCurrentAmount()
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
    const data = {
      "sender_institute_id_fk": this.logindata.inst_id
    }
    this._crud.GetwalletBySenderId(data).subscribe(
      (res: any) => {
        console.log(res);
        this.transactions = res.data
      }
    )
  }

  openAddMoneyDialog() {
    const dialogRef = this.dialog.open(AddMoneyComponent, {
      width: '400px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
    });
  }

}
