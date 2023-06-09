import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IProducts } from 'src/app/components/models/products';
import { BestSellersService } from 'src/app/services/best-sellers.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { RecentService } from 'src/app/services/recent.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class DialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private recentService: RecentService,
    private bestService: BestSellersService
  ) {}

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  cart$: Observable<IProducts[]> = this.productService.getProductFromCart();
  // cart: IProducts[];
  // cartSubscription: Subscription;

  recent$: Observable<IProducts[]> = this.productService.getRecentlyProducts();
  // recent: IProducts[];
  // recentSubscription: Subscription;
  bestSellers$: Observable<IProducts[]> =
    this.productService.getProductsFromBestSellers();

  fullPrice: number = 0;
  matcher: ErrorStateMatcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      nameCtrl: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      emailCtrl: new FormControl('', [Validators.required, Validators.email]),
      phoneCtrl: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
        ),
      ]),
      addressCtrl: new FormControl('', [Validators.required]),
      indexCtrl: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
    });
  }

  onConfirm() {
    this.recentService.addToRecent(this.cart$, this.recent$);
    this.bestService.addTobestSellers(this.cart$, this.bestSellers$);
  }
  toHome() {
    this.dialogRef.close();
    this.cartService.deleteCart(this.cart$);
    this.router.navigateByUrl('house/h-home');
    this.recentService.deleteRest(this.recent$);
  }
  onSubmit() {
    this.data = {
      name: this.firstFormGroup.value.nameCtrl,
      email: this.firstFormGroup.value.emailCtrl,
      phone: this.firstFormGroup.value.phoneCtrl,
      address: this.firstFormGroup.value.addressCtrl,
      index: this.firstFormGroup.value.indexCtrl,
    };
    this.cart$
      .pipe(
        map((data) => {
          data.map((item) => (this.fullPrice += item.quantity * item.price));
        })
      )
      .subscribe();
  }
}
