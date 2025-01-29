import { Component, OnInit } from '@angular/core';
import { ManageService } from 'src/app/manage.service';
import { AddMoneyComponent } from '../add-money/add-money.component';
import { MatDialog } from '@angular/material/dialog';
import { AddMoneyDirectComponent } from '../add-money-direct/add-money-direct.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-transaction-present-inst',
  templateUrl: './payment-transaction-present-inst.component.html',
  styleUrls: ['./payment-transaction-present-inst.component.css']
})
export class PaymentTransactionPresentInstComponent implements OnInit {
  base_url: string = 'https://www.educatorbox.com/api/'
  transactions: any
  logindata = {
    inst_id: 0,
    parent_center_id: '',
    addmission_fee: 0
  }
  getAddmissionStd = 0
  totalAmount: number = 0; // Example balance
  CreditAmount: number = 0;
  RefundAmount: number = 0;

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
    this.getWalletByReceiver()
    this.getAmount()
  }

  getAmount() {
    this._crud.getAmountmotherCenter(this.logindata.inst_id).subscribe(
      (res: any) => {
        console.log(res);
        this.CreditAmount = res.data.credit_amount
        this.RefundAmount = res.data.refund_amount
      })

  }

  getWalletByReceiver() {
    this._crud.GetwalletByreceiverId(this.logindata.inst_id).subscribe(
      (res: any) => {
        console.log(res);
        this.transactions = res.data.slice(0, 5)
      }
    )
  }

  openAddMoneyDialog() {
    const dialogRef = this.dialog.open(AddMoneyDirectComponent, {
      width: '400px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
      this.getWalletByReceiver()
      this.getAmount()
    });
  }

  onApproved(amt: number, id: number) {
    const isConfirmed = confirm(`Are you sure you want to approve the amount: ₹ ${amt}?`);

    if (isConfirmed) {
      const data = {
        "status": 1,
        "id": id
      }

      this._crud.ApproveAmount(data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.success == 1) {
            alert(`Amount ₹${amt} approved successfully!`);
            this.getWalletByReceiver()
            this.getAmount()
          }

        }
      )

    } else {
      // Logic when the user cancels
      alert('Approval process cancelled.');
    }
  }


  onReject(amt: number, id: number) {
    const isConfirmed = confirm(`Are you sure you want to Reject the amount: ₹ ${amt}?`);

    if (isConfirmed) {
      const data = {
        "status": 2,
        "id": id
      }

      this._crud.ApproveAmount(data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.success == 1) {
            alert(`Amount ₹${amt} Reject successfully!`);
            this.getWalletByReceiver()
          }

        }
      )

    } else {
      // Logic when the user cancels
    }
  }


  onSeeMore() {
    // Implement logic to load or display more transactions
    console.log('Load more transactions...');
    this._router.navigate(['/institutehome/walletreportpresent'])
  }



}
