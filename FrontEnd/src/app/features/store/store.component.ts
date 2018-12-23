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
  owners: any[] = [];

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
    private employeeService: EmployeeService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.storeService.getAll().then(
      (stores) => {
        this.stores = stores;
        this.owners = [];
        Promise.all(stores.map(i => this.employeeService.getByStore(i.id)))
          .then((employees: [Employee[]]) => {
            this.owners = employees.map((emps, i) => {
              const owner = emps.find(x => x.user.isOwner);
              return owner ? { name: owner.name, username: owner.user.username } : null;
            });

            this.storeSorted = this.stores.map((i, index) => ({
              data: i,
              name: i.name,
              address: i.address,
              owner: this.owners[index] ? this.owners[index].name : '',
              ownerUsername: this.owners[index] ? this.owners[index].username : '',
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
    this.store = new Store(event);
  }

  add() {
    this.store = new Store({});
  }
}
