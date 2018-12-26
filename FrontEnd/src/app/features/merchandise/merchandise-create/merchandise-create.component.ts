import { Merchandise, Category } from 'src/app/shared/models';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { MerchandiseService } from '../../../provider/merchandise.service';
import { CategoryService } from 'src/app/provider/category.service';

@Component({
  selector: 'app-merchandise-create',
  templateUrl: './merchandise-create.component.html',
  styleUrls: ['./merchandise-create.component.scss'],
})
export class MerchandiseCreateComponent implements OnInit {
  @Output() submit = new EventEmitter();
  @Input() merchandise: Merchandise;
  @Input() isUpdate;

  categories: Category[];
  submitted = false;

  constructor(
    private merchandiseService: MerchandiseService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getFromCurrentStore().then((res: any) => {
      this.categories = res;
    });
  }
  formSubmit(res: NgForm) {
    console.log(res);
    this.submitted = true;
  }
  add() {
    this.submit.emit(this.merchandise);
  }
  onCategoryClick(value) {
    this.merchandise.category = value;
  }
}
