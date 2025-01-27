import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { AddMoneyComponent } from '../add-money/add-money.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.css']
})
export class WalletHistoryComponent implements OnInit {
  transactions: any
  logindata = {
    inst_id: 0,
    parent_center_id: '',
    addmission_fee: 0
  }
  getAddmissionStd = 0
  totalAmount: number = 0; // Example balance

  constructor(
    private _crud: ManageService,
    private dialog: MatDialog,
    private _router: Router
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
        this.transactions = res.data.slice(0, 5)
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
      this.getWalletBySender()
    });
  }


  onSeeMore() {
    // Implement logic to load or display more transactions
    console.log('Load more transactions...');
    this._router.navigate(['/institutehome/walletreport'])
  }

}
