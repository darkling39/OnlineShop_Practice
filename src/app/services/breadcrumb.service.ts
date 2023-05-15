import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  constructor(private router: Router) {}
  href: string = '';
  getUrl() {
    return (this.href = this.router.url);
  }
}
