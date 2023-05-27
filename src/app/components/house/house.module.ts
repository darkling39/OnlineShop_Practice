import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HouseProductsComponent } from './components/house-products/house-products.component';
import { HouseHomeComponent } from './components/house-home/house-home.component';
import { HFooterComponent } from './components/ui/h-footer/h-footer.component';
import { HHeaderComponent } from './components/ui/h-header/h-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFilterPipe } from 'src/app/pipes/product-filter.pipe';
import { MatCardModule } from '@angular/material/card';
import { HouseDetailsComponent } from './components/house-details/house-details.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { CartComponent } from './components/cart/cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ProductSortingPipe } from 'src/app/pipes/product-sorting.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    HouseProductsComponent,
    HouseHomeComponent,
    HFooterComponent,
    HHeaderComponent,
    ProductFilterPipe,
    HouseDetailsComponent,
    CartComponent,
    DialogBoxComponent,
    ProductSortingPipe,
  ],
  imports: [
    CommonModule,
    HouseRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule,
    FormsModule,
    MatCardModule,
    BreadcrumbModule,
    MatDialogModule,
    MatFormFieldModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class HouseModule {}
