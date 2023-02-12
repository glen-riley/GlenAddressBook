import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, ColumnOption } from './address.model';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Subject, of, Subscription, combineLatest, merge } from 'rxjs';

@Component({
  selector: 'address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {
  @Input()
  public addressEntries: Address[] = [];
  public tableColumns: ColumnOption[] = [
    {
      id: 1,
      name: "firstName",
      label: "First Name",
      type: "text",
      isSortable: true,
    },
    {
      id: 2,
      name: "lastName",
      label: "Last Name",
      type: "text",
      isSortable: true,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "tel",
      label: "Phone Number"
    },
    {
      id: 4,
      name: "options",
      type: "button",
      label: "Options"
    }
  ];
  public newAddressForm: FormGroup = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    phoneNumber: ["", Validators.pattern('[- +()0-9]+')]
  });
  public totalPages: number[] = [];
  public pageSizes: number[] = [5, 10, 20];
  public pageSize: number = 5;
  public selectedPage: number = 1;
  public filteredAddressEntries: Address[] = [];
  private sortDirection = 'asc';
  private sortColumn = '';
  private sortSubject = new Subject<{ sortColumn: string; sortDirection: string; }>();
  private searchSubject = new Subject<string>();
  private paginationSubject = new Subject<{ currentPage: number; pageSize: number; }>();
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.setTotalPages();
    this.subscription = combineLatest([
      this.paginationSubject.pipe(startWith({
        currentPage: 1,
        pageSize: 5
      })),
      this.sortSubject.pipe(startWith({
        sortColumn: this.sortColumn,
        sortDirection: this.sortDirection
      })),
      this.searchSubject.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged())
    ]).pipe(
      map(([paging, sort, search]) => {
        this.filteredAddressEntries = this.addressEntries
          .filter(entry => {
            if (!search)
              return true;

            return entry.firstName.toLowerCase().includes(search) || entry.lastName.toLowerCase().includes(search)
          })
          .sort((a, b) => {
            if (!sort || !sort.sortColumn)
              return 0;

            if (sort.sortDirection === 'asc')
              return a[sort.sortColumn] > b[sort.sortColumn] ? 1 : -1;
            else
              return a[sort.sortColumn] < b[sort.sortColumn] ? 1 : -1;
          })
          .slice((paging.currentPage - 1) * paging.pageSize, paging.currentPage * paging.pageSize)
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  public addAddress(): void {
    if (this.newAddressForm.valid) {
      this.addressEntries.push(this.newAddressForm.value);
      this.filteredAddressEntries.push(this.newAddressForm.value);
      this.newAddressForm.reset();
    }
  }

  public removeAddress(address: Address): void {
    this.addressEntries = this.addressEntries.filter(a => a.id !== address.id);
    this.filteredAddressEntries = this.filteredAddressEntries.filter(a => a.id !== address.id);
  }

  public searchAddressEntries(searchEvent: Event): void {
    const inputValue = (searchEvent.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue.toLowerCase());
  }

  public sortAddressEntries(sortedColumnName: string): void {
    if (this.sortColumn === sortedColumnName)
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    else {
      this.sortColumn = sortedColumnName;
      this.sortDirection = 'asc'
    }

    this.sortSubject.next({
      sortColumn: sortedColumnName,
      sortDirection: this.sortDirection
    });
  }

  // I added pagination very quickly for the requirement: "Support from zero to a “large number” of entries."
  public changeAddressPaging(selectedPage: number, pageSize: number): void {
    this.selectedPage = selectedPage;
    this.pageSize = pageSize;
    this.paginationSubject.next({
      currentPage: selectedPage,
      pageSize: pageSize
    });
    this.setTotalPages();
  }

  private setTotalPages(): void {
    let numberOfPages = Math.ceil(this.addressEntries.length / this.pageSize);
    this.totalPages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  }
}