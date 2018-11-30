import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Category } from '../../shared/models';
import { CategoryService } from '../../provider/category.service';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category = {
    id: -1,
    name: '',
    createdDate: new Date,
    data: {},
  };
  listCategory: Category[] = [];
  listCategorySorted: Category[] = [];
  typeSort = ['', ''];
  style: boolean[] = [false, false];
  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 10,
    currentPage: 1,
  };
  isUpdate: boolean;
  constructor(
    private categoryService: CategoryService,
    private notifyService: NotificationBarService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categoryService.getFromCurrentStore().then(
      (res: any) => {
        this.listCategory = res;
        this.listCategorySorted = this.listCategory;
        console.log(this.listCategory);
      },
      (er) => {
        console.warn(er);
      });
  }

  formatDate(date) {
    return moment(date).format('MMM Do, YYYY');
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

  add() {
    this.isUpdate = false;
    this.category.id = -1;
    this.category.name = '';
    this.category.createdDate = null;
    this.category.data = {};
  }

  edit(event) {
    this.isUpdate = true;
    this.category.id = event.id;
    this.category.name = event.name;
    this.category.createdDate = event.createdDate;
    this.category.data = event;
  }

  delete(item) {
    const id = item.id;
    this.categoryService.delete(id)
      .then(() => {
        // window.location.reload();
        this.listCategorySorted.splice(this.listCategorySorted.indexOf(item), 1);
        this.ref.markForCheck();

        this.notifyService.create({
          message: 'Process deleted successfully.',
          type: NotificationType.Success,
        });
      })
      .catch((err) => {
        this.notifyService.create({
          message: 'Failed to delete.',
          type: NotificationType.Error,
        }),
          console.warn(err);
      });
  }
}
