import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent {
  qrcode: boolean = false
  ownername: string = ''
  mobileno: string = ''
  amount: string = ''
  fileuploded: any

  logindata = {
    inst_id: '',
    parent_center_id: '',
    addmission_fee: '',
    center_code: ''
  }

  constructor(
    private _crud: ManageService,
    private dialogRef: MatDialogRef<AddMoneyComponent>) {
    const data = localStorage.getItem('Token')
    if (data) {
      this.logindata = JSON.parse(data)
    }
  }

  uploadedFileName: string | null = null;
  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileuploded = file
      this.uploadedFileName = file.name;
      console.log('Uploaded file:', file);
    }
  }

  onAdd() {
    console.log(this.logindata.center_code);
    if (this.ownername == '' || this.mobileno == '' || this.amount == '' || this.fileuploded == undefined) {
      alert('Please fill all the filds')
    } else {
      const currentDate = new Date();
      const formattedDate = this.formatDate(currentDate);
      const adddata = new FormData()
      adddata.append('transaction_date', formattedDate)
      adddata.append('amount', `${this.amount}`)
      adddata.append('sender_institute_id_fk', this.logindata.inst_id)
      adddata.append('center_code', this.logindata.center_code || 'DEM005');
      adddata.append('receiver_institute_id_fk', this.logindata.parent_center_id)
      adddata.append('status', '0')
      adddata.append('description', '')
      adddata.append('attachment', this.fileuploded || '')
      adddata.append('center_owner_name', this.ownername)
      adddata.append('mobile_no', this.mobileno)
      adddata.append('title', 'Payment Create By Sankalp EDU')
      adddata.append('std_id', '')

      this._crud.AddMoeny(adddata).subscribe(
        (res: any) => {
          console.log(res);

          if (res.success == 1) {
            console.log('Money added successfully!');
            this.dialogRef.close(1);
          }
        }
      )

    }


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

  onQrcodeShow() {
    this.qrcode = !this.qrcode;
  }

}
