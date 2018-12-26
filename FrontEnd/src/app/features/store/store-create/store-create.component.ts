import { StoreService } from './../../../provider/store.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Store, Employee } from 'src/app/shared/models';
import { EmployeeService } from 'src/app/provider/employee.service';

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.scss'],
})
export class StoreCreateComponent implements OnInit {
  @Input() data: Store;
  @Input() isUpdate;

  employees: Employee[] = [];

  get isNewUser() {
    return !this.employees.find(x => x.user.username === this.data.ownerUsername);
  }

  constructor(
    private storeService: StoreService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.employeeService.getByStore(this.data.id).then(res => this.employees = res);
    }
  }

  submit() {
    console.log(this.data);
    (this.isUpdate ? this.update() : this.update()).then(
      () => window.location.reload(),
    );
  }

  update() {
    return this.storeService.update(this.data);
  }
}
