import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileCustomerService } from '../shared/profile-customer.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.less']
})
export class SettingInfoComponent {

  @Input() customerId !: String;
  @Input() customer: any;
  @Output() public infoCustomer: EventEmitter<any> = new EventEmitter<any>();
  @Output() public bodyCustomer: EventEmitter<any> = new EventEmitter<any>();

  public formInfo !: FormGroup;
  public formBody !: FormGroup;

  public bodyCustomers: any;

  public constructor(private profileCustomerService: ProfileCustomerService) {

  }

  ngOnInit() {
    this.showBodyOfCustomer();
    this.setFormInfo();
  }

  public showBodyOfCustomer(): void {
    const id = this.customerId;
    this.profileCustomerService.showBodyOfCustomer(id).pipe().subscribe((data) => {
      this.bodyCustomers = data.bodyCustomer
      this.setFormBody();
    })
  }

  public setFormInfo(): void {
    this.formInfo = new FormGroup({
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      numberPhone: new FormControl(''),
      street: new FormControl(''),
      ward: new FormControl(''),
      district: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl('')
    })
  }

  public setFormBody(): void {
    this.formBody = new FormGroup({
      chest: new FormControl(''),
      waist: new FormControl(''),
      hips: new FormControl(this.bodyCustomers.hips),
      height: new FormControl(this.bodyCustomers.height),
      weight: new FormControl(this.bodyCustomers.weight),
    });
  }


  public editInfoCustomer(): void {
    const params = {
      productId: this.formInfo.controls['productId']?.value,
      fabricId: this.formInfo.controls['fabricId']?.value,
      price: this.formInfo.controls['price']?.value,
      discount: this.formInfo.controls['discount']?.value,
      priceGroup: this.formInfo.controls['priceGroup']?.value,
      startDate: this.formInfo.controls['startDate']?.value,
      endDate: this.formInfo.controls['endDate']?.value,
      promotionDescription: this.formInfo.controls['promotionDescription']?.value
    }
    this.infoCustomer.emit(params);
  }

  public editBodyCustomer(): void {
    const params = {
      productId: this.formBody.controls['productId']?.value,
      fabricId: this.formBody.controls['fabricId']?.value,
      price: this.formBody.controls['price']?.value,
      discount: this.formBody.controls['discount']?.value,
      priceGroup: this.formBody.controls['priceGroup']?.value,
      startDate: this.formBody.controls['startDate']?.value,
      endDate: this.formBody.controls['endDate']?.value,
      promotionDescription: this.formBody.controls['promotionDescription']?.value
    }
    this.bodyCustomer.emit(params);
  }

}
