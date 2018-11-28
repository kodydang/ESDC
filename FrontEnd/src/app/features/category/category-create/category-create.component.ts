import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { CategoryService } from '../../../provider/category.service';

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
  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
  }

  formSubmit(res: NgForm) {
    console.log(res);
    this.submitted = true;
  }
  add() {
    this.category.createdDate = moment(this.category.createdDate);
    this.submit.emit(this.category);
    const category = this.category;
    if (this.isUpdate) {
      this.categoryService.update(category.id, category.name);
    } else {
      this.categoryService.add(category.name);
    }
  }
}
