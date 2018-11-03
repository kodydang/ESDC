import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Category } from '../../shared/models';
import { CategoryService } from '../../provider/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category = {
    name: '',
    gender: '',
    address: '',
    email: '',
    birthday: null,
    phone: '',
  };
  listCategory: Category[] = [];
  listCategorySorted: Category[] = [];
  typeSort = ['', '', '', ''];
  style: boolean[] = [false, false, false, false];
  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 4,
    currentPage: 1,
  };
  isUpdate: boolean;
  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categoryService.getAll().subscribe(
      (res: any) => {
        this.listCategory = res;
        this.listCategorySorted = this.listCategory;
        // console.log(this.listCategory);
      },
      (er) => {
        console.warn(er);
      });
  }

  formatDate(date) {
    return moment(date).format('ll');
  }

  sortBy(type, position) {
    this.typeSort[position] = type;
    this.style[position] = !this.style[position];
    // console.log(this.typeSort);

    if (this.style[position]) {
      return this.listCategorySorted = _.sortBy(this.listCategorySorted, [type]);
    }
    return this.listCategorySorted = _.reverse(_.sortBy(this.listCategorySorted, [type]));
  }

  sortIcon(type, position) {
    if (this.typeSort[position] === type) {
      if (this.style[position]) {
        return 'fa-sort-down';
      }
      return 'fa-sort-up';
    }
    return 'fa-sort';
  }

  onPageChange(number) {
    this.paginateConfig.currentPage = number;
  }

  addEvent(event) {
    console.log(event);

  }
  add() {
    this.isUpdate = false;
    this.category.name = '';
    this.category.gender = '';
    this.category.address = '';
    this.category.email = '';
    this.category.birthday = null;
    this.category.phone = '';
  }

  edit(event) {
    this.isUpdate = true;
    this.category.name = event.name;
    this.category.gender = event.gender;
    this.category.address = event.address;
    this.category.email = event.email;
    this.category.birthday = event.birthday;
    this.category.phone = event.phone;
  }
}
