import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  @Output() submit = new EventEmitter();
  @Input() category;
  @Input() isUpdate;
  submitted = false;
  constructor() { }

  ngOnInit() {
  }

  formSubmit(res: NgForm) {
    console.log(res);
    this.submitted = true;
  }
  add() {
    this.category.birthday = moment(this.category.birthday).toDate();
    this.submit.emit(this.category);
  }
  onGenderClick(value) {
    this.category.gender = value;
  }
}
