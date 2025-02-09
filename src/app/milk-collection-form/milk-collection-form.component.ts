import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormGroup, FormBuilder, Validators
import { Component } from '@angular/core';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CurrencyFormatterPipe } from '../currency-formatter.pipe';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { fatRates } from '../dairy-data/fat-rate';
import { vendorsData } from '../dairy-data/vendors';
import moment from 'moment';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY', // This is how you parse input
  },
  display: {
    dateInput: 'DD MMM YYYY', // This is how you display the date
  },
};


@Component({
  standalone: true,  // Specify that it's a standalone component
  selector: 'app-milk-collection-form',
  templateUrl: './milk-collection-form.component.html',
  styleUrls: ['./milk-collection-form.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  imports: [CommonModule, ReactiveFormsModule, CurrencyFormatterPipe]
})
export class MilkCollectionFormComponent {
  // Google API
  apiKey: string = 'AIzaSyBHU6SMUZeW7mwXrif72aTSi2Rqik7si9o';
  spreadsheetId: string = '1II47Y8ML7QkBwR-WWpGalodiWFSbBD-T0Alqx2yuGOs';

  milkCollectionForm!: FormGroup;

  date = new Date
  today = moment().format('DD MMMM YYYY');;

  dateToDisplay = this.convertToMarathiDate(this.date);
  constructor(private fb: FormBuilder) { }

  currentHour = new Date().getHours();
  defaultSession = this.currentHour < 12 ? 'Morning' : 'Evening';
  rates = fatRates;
  vendors = vendorsData;

  currentSession = this.defaultSession;

  ngOnInit() {
    this.milkCollectionForm = this.fb.group({
      date: [this.today],
      vendor: [0, Validators.required],
      session: [this.defaultSession, Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      fat: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      amount: [0, Validators.required],
    });
  }

  enableFatField(evt: any) {
    if (evt.target.value <= 0) {
      this.milkCollectionForm.controls["fat"].disable()
    } else {
      this.milkCollectionForm.controls["fat"].enable()
    }
  }

  calculateAmount(evt: any) {
    let quantity = this.milkCollectionForm.get('quantity')?.value;
    let fat = evt.target.value;
    let amount = quantity * this.rates[fat];

    this.milkCollectionForm.controls["amount"].setValue(amount)

  }

  get selectedSession() {
    // Function to set session based on AM or PM
    return this.milkCollectionForm.get('session')?.value;
  }

  get amount() {
    // Function to display amount based on Milk quantity and Fat %
    return this.milkCollectionForm.get('amount')?.value;
  }

  convertToMarathiDate(date: Date): string {
    const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    let formattedDate = date.toLocaleDateString('mr-IN', options);

    return formattedDate.replace(/\d/g, (digit) => marathiDigits[+digit]);
  }

  getVendorPhone(vendorId: string): string | null {
    const vendor = vendorsData.find(v => v.name === vendorId);
    return vendor ? vendor.phone : null;
  }

  getVendorName(vendorId: string): string | null {
    const vendor = vendorsData.find(v => v.name === vendorId);
    return vendor ? vendor.name : null;
  }

  clearForm() {
    this.milkCollectionForm.reset();
  }

  generateMessage() {
  }

  onSubmit() {
    if (this.milkCollectionForm.valid) {
      console.log(this.milkCollectionForm.value);
      let vendor = this.milkCollectionForm.value.vendor;
      const vendorName = this.getVendorName(vendor);
      const phoneNumber = this.getVendorPhone(vendor);
      alert(`${vendorName} | Milk ${this.milkCollectionForm.value.quantity} | Fat ${this.milkCollectionForm.value.fat}`)

      // Whatsapp
const message = encodeURIComponent(`
_मीनाताई ठाकरे सह. दूध संस्था, नेसरी_ \n
नमस्कार *${vendorName}*,
आपल्या म्हैस दूध संकलनाचा तपशील:\n
दिनांक: ${this.dateToDisplay}
सत्र: ${this.defaultSession === 'morning' ? 'सकाळ' : 'सायंकाळ'}\n
दूध: *${this.milkCollectionForm.value.quantity}* लीटर | फॅट: *${this.milkCollectionForm.value.fat}*
*रक्कम: ₹. ${this.milkCollectionForm.value.amount}*
\n
आभारी आहोत!
`);
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
window.open(whatsappUrl, '_blank');

      // Excel for future
      const ExcelFileData = {
        sheetName: vendorName,
        date: this.today,
        session: this.defaultSession,
        quantity: this.milkCollectionForm.value.quantity,
        fat: this.milkCollectionForm.value.fat,
        amount: this.milkCollectionForm.value.amount,
      }


    setTimeout(() => {
      this.milkCollectionForm.reset();
    }, 5000);
  }
}
}