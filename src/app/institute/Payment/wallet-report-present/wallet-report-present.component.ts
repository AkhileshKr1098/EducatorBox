import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-wallet-report-present',
  templateUrl: './wallet-report-present.component.html',
  styleUrls: ['./wallet-report-present.component.css']
})
export class WalletReportPresentComponent implements OnInit {

 
  base_url: string = 'https://www.educatorbox.com/api/'
  transactions: any
  logindata = {
    inst_id: '',
    parent_center_id: '',
    addmission_fee: 0
  }
  getAddmissionStd = 0
  totalAmount: number = 0; // Example balance
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

  }


  getWalletByReceiver() {
    this._crud.GetwalletByreceiverId(this.logindata.inst_id).subscribe(
      (res: any) => {
        console.log(res);
        this.transactions = res.data
      }
    )
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
    this._router.navigate(['/institutehome/walletreport'])
  }


}
