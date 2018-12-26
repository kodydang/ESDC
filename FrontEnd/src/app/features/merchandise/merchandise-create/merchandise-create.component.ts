import { Merchandise, Category } from 'src/app/shared/models';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MerchandiseService } from '../../../provider/merchandise.service';
import { CategoryService } from 'src/app/provider/category.service';

@Component({
  selector: 'app-merchandise-create',
  templateUrl: './merchandise-create.component.html',
  styleUrls: ['./merchandise-create.component.scss'],
})
export class MerchandiseCreateComponent implements OnInit {
  @Input() merchandise: Merchandise;
  @Input() isUpdate;

  categories: Category[];

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
    const data = new Merchandise({ ...this.merchandise, ...res.value });
    (this.isUpdate ? this.update(data) : this.add(data)).then(
      () => window.location.reload(),
    );
  }

  add(data: Merchandise) {
    return this.merchandiseService.create([data]);
  }

  update(data: Merchandise) {
    return this.merchandiseService.update([data]);
  }

  onCategoryClick(value) {
    this.merchandise.category = value;
  }
}
