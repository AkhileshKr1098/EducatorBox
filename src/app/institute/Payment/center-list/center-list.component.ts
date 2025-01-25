import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ManageService } from 'src/app/manage.service';
import { CenterUpdateComponent } from '../center-update/center-update.component';

@Component({
  selector: 'app-center-list',
  templateUrl: './center-list.component.html',
  styleUrls: ['./center-list.component.css']
})
export class CenterListComponent implements OnInit {
  displayedColumns: string[] = ['inst_id', 'center_code', 'inst_name', 'inst_owner_name', 'inst_email', 'inst_whatsapp_no', 'addmission_fee', 'action'];
  dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  logindata: { inst_id: number; parent_center_id: string; admission_fee: number } = {
    inst_id: 0,
    parent_center_id: '',
    admission_fee: 0
  };

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private service: ManageService,
    private toastService: NgToastService
  ) {
    const storedData = localStorage.getItem('Token');
    if (storedData) {
      this.logindata = JSON.parse(storedData);
    }

    // Ensure route refresh on navigation
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getCenterList();
  }

  getCenterList(): void {
    this.service.getCenterList(this.logindata.inst_id).subscribe(
      (res: any) => {
        if (res && res.success) {
          // Set the table data source with the received data
          this.dataSource.data = res.data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.toastService.error({
            detail: 'Error',
            summary: res.message || 'Failed to fetch data.',
            duration: 5000
          });
        }
      },
      (error) => {
        console.error('Error fetching center list:', error);
        this.toastService.error({
          detail: 'Error',
          summary: 'Something went wrong while fetching data.',
          duration: 5000
        });
      }
    );
  }

  onEdit(element: any) {

    const updatevalue = 1
    const dialogRef = this.dialog.open(CenterUpdateComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (updatevalue == result) {
        console.log(result);
        this.getCenterList()

      }
      else { }
    });
  }

}
