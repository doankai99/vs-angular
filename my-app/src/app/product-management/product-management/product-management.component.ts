import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.less']
})
export class ProductManagementComponent {
  toggleValue: boolean = true;
  public isOpen = false
  public dataProduct: any;
  public isLoading: boolean = false;
  public currentPage: number = 1;
  public pageSize: number = 3;

  public constructor(private productService: ProductService) {

  }

  public ngOnInit() {
    this.getAllProduct();
  }

  public previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public nextPage() {
    if (this.currentPage * this.pageSize < this.dataProduct.length) {
      this.currentPage++;
    }
  }


  public getAllProduct() {
    this.isLoading = true;
    this.productService.getAllProduct().subscribe((data) => {
      if (data) {
        this.dataProduct = data.products
      } else {
        alert("hiển thị product thất bại")
      }
      this.isLoading = false
    })
  }

  public handleEditProduct() {
    this.getAllProduct();
  }

  public handleAddProduct(queryParams: any) {
    this.isOpen = !this.isOpen
    this.isLoading = true;
    this.productService.addProduct(queryParams).subscribe((data) => {
      if (data) {
        alert('Add new product success');
        this.getAllProduct();
      } else {
        alert('Add new product faild')
      }
      this.isLoading = false
    })
  }

}
