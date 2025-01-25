import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';

@Component({
  selector: 'app-center-update',
  templateUrl: './center-update.component.html',
  styleUrls: ['./center-update.component.css']
})
export class CenterUpdateComponent implements OnInit {
  currentAmount: number = 0
  constructor(
    private matref: MatDialogRef<CenterUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any,
    private _crud: ManageService
  ) { }

  ngOnInit(): void {
    console.log(this.edit_data);
    this.currentAmount = this.edit_data.addmission_fee
  }

  onUpdate() {
    console.log(this.edit_data);
    console.log(this.currentAmount);
    const fromdata = new FormData()
    fromdata.append('inst_id', this.edit_data.inst_id)
    fromdata.append('addmission_fee', `${this.currentAmount}`)

    this._crud.addmissionFeeUpdate(fromdata).subscribe(
      (res: any) => {
        console.log(res);
        if (res.success == 1) {
          alert('Admission fee updated successfully.')
          this.matref.close(1)

        }
      }
    )
  }
}
