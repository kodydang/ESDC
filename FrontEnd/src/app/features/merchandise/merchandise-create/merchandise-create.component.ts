import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { MerchandiseService } from '../../../provider/merchandise.service';

@Component({
  selector: 'app-merchandise-create',
  templateUrl: './merchandise-create.component.html',
  styleUrls: ['./merchandise-create.component.scss'],
})
export class MerchandiseCreateComponent implements OnInit {
  @Output() submit = new EventEmitter();
  @Input() merchandise;
  @Input() isUpdate;

  categories: any;
  submitted = false;
  constructor(
    private merchandiseService: MerchandiseService,
  ) {
  }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.merchandiseService.getCategory().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories);
    });
  }
  formSubmit(res: NgForm) {
    console.log(res);
    this.submitted = true;
  }
  add() {
    this.merchandise.birthday = moment(this.merchandise.birthday).toDate();
    this.submit.emit(this.merchandise);
  }
  onCategoryClick(value) {
    this.merchandise.category = value;
  }
}
