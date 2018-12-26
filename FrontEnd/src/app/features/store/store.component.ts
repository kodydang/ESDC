import * as _ from 'lodash';
import { Account } from './../../shared/models/account';
import { Component, OnInit } from '@angular/core';
import { Employee } from './../../shared/models/employee';
import { EmployeeService } from 'src/app/provider/employee.service';
import { Store } from 'src/app/shared/models';
import { StoreService } from './../../provider/store.service';

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
  openDiaglog = false;

  paginateConfig = {
    id: 'paginator',
    itemsPerPage: 10,
    currentPage: 1,
  };

  isUpdate = false;

  constructor(
    private storeService: StoreService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.storeService.getAll().then(
      (stores) => {
        this.stores = stores;
        Promise.all(stores.map(store => this.employeeService.getByStore(store.id)))
          .then((employees: [Employee[]]) => {
            employees.forEach((emps, index) => {
              const owner = emps.find(x => x.user.isOwner);
              if (owner) {
                this.stores[index].ownerId = owner.id;
                this.stores[index].ownerName = owner.name;
                this.stores[index].ownerUsername = owner.user.username;
              }
            });

            this.storeSorted = this.stores.map(i => ({
              data: i,
              name: i.name,
              address: i.address,
              ownerName: i.ownerName,
              ownerUsername: i.ownerUsername,
            }));
          },
        );
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
    this.store = new Store(event.data);
    this.isUpdate = true;
    this.openDiaglog = true;
  }

  add() {
    this.store = new Store({});
    this.isUpdate = false;
    this.openDiaglog = true;
  }
}
