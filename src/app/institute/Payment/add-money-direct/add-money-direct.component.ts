import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-money-direct',
  templateUrl: './add-money-direct.component.html',
  styleUrls: ['./add-money-direct.component.css']
})
export class AddMoneyDirectComponent implements OnInit {

  qrcode: boolean = false
  ownername: string = ''
  mobileno: string = ''
  amount: string = ''
  description: string = ''
  center_code: string = ''
  center_id: number = 0
  logindata = {
    inst_id: 0,
    parent_center_id: '',
    addmission_fee: '',
    center_code: ''
  }
  center_list: any
  paymentMethod: boolean = false
  ngOnInit(): void {
    this.getCenterList()
  }
  constructor(
    private _crud: ManageService,
    private dialogRef: MatDialogRef<AddMoneyDirectComponent>) {
    const data = localStorage.getItem('Token')
    if (data) {
      this.logindata = JSON.parse(data)
    }
  }

  getCenterList() {
    this._crud.getCenterList(this.logindata.inst_id).subscribe(
      (res: any) => {
        console.log(res);
        this.center_list = res.data
      }
    )
  }



  onAdd() {
    console.log(this.logindata.center_code);
  
    // Validate required fields
    if (!this.ownername || !this.mobileno || !this.center_id) {
      console.log('Please fill in required fields');
      alert('Please fill in required fields');

      return;
    }
  
    // Check payment method and description validation
    if (this.paymentMethod) {
      if (!this.description) {
        alert('Please add a description if you selected money return');
        return;
      }
    }
  
    // Prepare transaction data
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const adddata = new FormData();
  
    adddata.append('transaction_date', formattedDate);
    adddata.append('amount', `${this.amount}`);
    adddata.append('sender_institute_id_fk', `${this.center_id}`);
    adddata.append('center_code', this.center_code);
    adddata.append('receiver_institute_id_fk', `${this.logindata.inst_id}`);
    adddata.append('status', '1');
    adddata.append('description', this.description);
    adddata.append('attachment', '');
    adddata.append('center_owner_name', this.ownername);
    adddata.append('mobile_no', this.mobileno);
    adddata.append('title', 'Payment Created By Sankalp EDU');
    adddata.append('std_id', '');
  
    console.log('Sending Data:', adddata);
  
    // API call to add money
    this._crud.AddMoeny(adddata).subscribe(
      (res: any) => {
        console.log('API Response:', res);
  
        if (res.success == 1) {
          console.log('Money added successfully!');
          this.dialogRef.close(1);
        }
      },
      (error) => {
        console.error('Error adding money:', error);
      }
    );
  }
  

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  onSelectCenter(event: any) {
    console.log(event);
    const centerdata = this.center_list.filter((cet: any) => cet.inst_id == event)
    console.log(centerdata[0].center_code)
    this.center_code = centerdata[0].center_code
    this.center_id = centerdata[0].inst_id
  }

  onSelectPayment(event: any) {
    console.log(event)
    if (event == 3) {
      this.paymentMethod = true
    } else {
      this.paymentMethod = false
    }
  }



}
