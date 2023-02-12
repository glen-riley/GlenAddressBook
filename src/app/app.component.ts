import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AddressBookService } from './address-book/address-book.service';
import { Address } from './address-book/address.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public addressEntries: Address[] = [];
  public searchTermChanged: Subject<string> = new Subject<string>();
  public searchTerm: string = "";

  constructor(private addressBookService: AddressBookService) {
    this.searchTermChanged
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((search) => {
        this.searchTerm = search;
      });
  }

  public ngOnInit() {
    this.getAddresses();
  }

  public searchFilter(e: any): void {
    this.searchTermChanged.next(e.target.value);
  }

  private getAddresses(): void {
    // Passing the address data into the component as filtering will be handled locally
    this.addressBookService.getAddressEntries().subscribe({
      next: result => {
        this.addressEntries = result;
      },
      error: error => {
        // Some kind of notification/error handling service
        console.error(error);
      }
    });
  }
}
