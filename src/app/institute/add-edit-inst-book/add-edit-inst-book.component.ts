import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-add-edit-inst-book',
  templateUrl: './add-edit-inst-book.component.html',
  styleUrls: ['./add-edit-inst-book.component.css'],
  // encapsulation:ViewEncapsulation.None
})
export class AddEditInstBookComponent implements OnInit {

  disableSelect = new FormControl(false);
  inst_book_form!: FormGroup;
  admin = 1;
  upload: any;
  actionBtn: string = 'Add'
  course_data: any;
  login_deatils: any
  login: any
  inst_id_for_inst_login: any
  image_url: any = "assets/doc.png"
  image_select: any = null
  url: string = 'assets/'

  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private service: ManageService,
    private matref: MatDialogRef<AddEditInstBookComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_inst_book: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.inst_id_for_inst_login = this.login.inst_id
  }
  ngOnInit(): void {
    const formdata = new FormData()
    formdata.append("inst_id", this.inst_id_for_inst_login)
    this.service.get_course_by_inst_id(formdata).subscribe(
      (std_res: any) => {
        this.course_data = std_res.data
      }
    )
    this.inst_book_form = this.fb.group({
      inst_book_id: ['',],
      inst_book_title: ['', Validators.required],
      inst_book_img: [''],
      inst_book_description: [''],
      course_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required]
    })

    if (this.edit_inst_book) {
      this.actionBtn = "Update";
      this.inst_book_form.controls['inst_book_id'].setValue(this.edit_inst_book.inst_book_id);
      this.inst_book_form.controls['inst_book_title'].setValue(this.edit_inst_book.inst_book_title);
      this.inst_book_form.controls['inst_book_img'].setValue(this.edit_inst_book.inst_book_img);
      this.inst_book_form.controls['inst_book_description'].setValue(this.edit_inst_book.inst_book_description);
      this.inst_book_form.controls['course_id_fk'].setValue(this.edit_inst_book.course_id);
      this.inst_book_form.controls['admin_id_fk'].setValue(this.edit_inst_book.admin_id_fk);
      this.image_url = this.url + this.edit_inst_book.inst_book_img
      this.image_select = this.edit_inst_book.inst_book_img
    }
  }
  inst_book_btn() {
    const formdata = new FormData();
    formdata.append('inst_book_id', this.inst_book_form.get('inst_book_id')?.value);
    formdata.append('inst_book_title', this.inst_book_form.get('inst_book_title')?.value);
    formdata.append('inst_book_img', this.image_url)
    formdata.append('inst_book_description', this.inst_book_form.get('inst_book_description')?.value);
    formdata.append('course_id_fk', this.inst_book_form.get('course_id_fk')?.value);
    formdata.append('institute_id_fk', this.inst_id_for_inst_login);
    formdata.append('admin_id_fk', this.inst_book_form.get('admin_id_fk')?.value);
    if (!this.edit_inst_book) {
      if (this.inst_book_form.valid) {
        this.service.post_inst_book(formdata).subscribe(
          (result: any) => {
            console.log(result)
            this.matref.close();
            this.inst_book_form.reset();
            this.popup.success({ detail: 'Success', summary: 'Book Saved', })
            this.router.navigate(['/institutehome/instbook'])

          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'Unsuccess', summary: 'Book Not Saved', })
          }
        )
      }
    }
    else {
      this.updateInstBook()
    }
  }
  updateInstBook() {
    console.log(this.inst_book_form.value)
    const updatedata = new FormData();
    updatedata.append('inst_book_id', this.inst_book_form.get('inst_book_id')?.value);
    updatedata.append('inst_book_title', this.inst_book_form.get('inst_book_title')?.value);
    updatedata.append('inst_book_img', this.image_url)
    updatedata.append('inst_book_description', this.inst_book_form.get('inst_book_description')?.value);
    updatedata.append('course_id_fk', this.inst_book_form.get('course_id_fk')?.value);
    updatedata.append('institute_id_fk', this.inst_id_for_inst_login);
    updatedata.append('admin_id_fk', this.inst_book_form.get('admin_id_fk')?.value);
    this.service.put_inst_book(updatedata).subscribe({
      next: (res: any) => {
        console.log(res)
        this.matref.close();
        this.router.navigate(['/institutehome/instbook'])
        this.popup.success({ detail: 'Success', summary: 'Book Updated', })
      },
      error: (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Book Not Updated', })
      }
    })
  }

  OnUpload(files: any) {    
    this.image_url = files[0]
}
}