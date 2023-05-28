import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProducts } from 'src/app/components/models/products';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css'],
})
export class ReviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    public storage: StorageService
  ) {}
  reviewGroup!: FormGroup;
  product: IProducts;

  ngOnInit() {
    this.reviewGroup = new FormGroup({
      reviewCtrl: new FormControl('', [Validators.required]),
    });
  }
  onSubmit(item: IProducts) {
    this.data = {
      text: this.reviewGroup.value.reviewCtrl,
    };
    console.log(item);

    if (!item.reviews) {
      item.reviews = [];
      if (this.data.text !== '') {
        item.reviews.push(this.data.text);
        this.productService.updateProduct(item).subscribe();
      }
    } else {
      item.reviews.push(this.data.text);
      this.productService.updateProduct(item).subscribe();
    }
    this.dialogRef.close();
  }
}
