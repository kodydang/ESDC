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
  @Input() category;
  @Input() isUpdate;
  submitted = false;
  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
  }

  add() {
    this.categoryService.add(this.category)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  update() {
    this.categoryService.update(this.category.id, this.category.name)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  submit() {
    if (this.isUpdate) {
      this.update();
    } else {
      this.add();
    }
  }
}
