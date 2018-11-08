import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { StoreService } from './../../provider/store.service';
import { Store } from 'src/app/shared/models';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  store = new Store({});
  stores: Store[] = [];
  storeSorted: {}[] = [];

  sortKey = '';
  sortReverse = false;
  filter = '';

  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.storeService.getAll().subscribe(
      (res: any) => {
        this.stores = res;
        this.storeSorted = this.stores.map(i => ({
          data: i,
          name: i.name,
          address: i.address,
          owner: i.owner,
        }));
      },
      (er) => {
        console.warn(er);
      });
  }

  sortBy(type) {
    if (this.sortKey === type) {
      this.sortReverse = !this.sortReverse;
      return this.storeSorted = _.reverse(this.storeSorted);
    }

    this.sortKey = type;
    this.sortReverse = false;
    return this.storeSorted = _.sortBy(this.storeSorted, [type]);
  }

  sortIcon(type) {
    if (this.sortKey === type) {
      return this.sortReverse ? 'fa-sort-down' : 'fa-sort-up';
    }
    return 'fa-sort';
  }

  onPageChange(number) {
    this.paginateConfig.currentPage = number;
  }

  edit(event) {
    this.store = new Store(event);
  }

  add() {
    this.store = new Store({});
  }
}