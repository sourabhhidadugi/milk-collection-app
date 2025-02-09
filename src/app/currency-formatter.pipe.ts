import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatter'
})
export class CurrencyFormatterPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value) return '₹ 0'; // Handle null/undefined cases
    return `₹ ${value}`;
  }
}
