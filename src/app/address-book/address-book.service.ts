import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Address } from "./address.model";

@Injectable()
export class AddressBookService {

  public getAddressEntries(): Observable<Address[]> {
    return of([
      {
        id: 1,
        firstName: "Glen",
        lastName: "Riley",
        phoneNumber: "779-999-9999"
      },
      { 
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        phoneNumber: ""
      },
      {
        id: 3,
        firstName: "John",
        lastName: "Smith",
        phoneNumber: "767-891-3233"
      },
      {
        id: 4,
        firstName: "Sam",
        lastName: "Weasles",
        phoneNumber: "756-745-8888"
      },
      { 
        id: 5,
        firstName: "Andy",
        lastName: "Crump",
        phoneNumber: "798-888-7777"
      },
      {
        id: 6,
        firstName: "Rob",
        lastName: "Decap",
        phoneNumber: ""
      },
      {
        id: 7,
        firstName: "Anna",
        lastName: "Kazink",
        phoneNumber: "741-112-2222"
      },
      { 
        id: 8,
        firstName: "Magnus",
        lastName: "Nakumura",
        phoneNumber: "712-222-3333"
      },
      {
        id: 9,
        firstName: "Hikaru",
        lastName: "Carlsen",
        phoneNumber: "724-444-5555"
      },
      {
        id: 10,
        firstName: "Dobuv",
        lastName: "Renek",
        phoneNumber: "730-000-9999"
      },
      { 
        id: 11,
        firstName: "Ulrich",
        lastName: "Namster",
        phoneNumber: "749-999-8888"
      },
      {
        id: 12,
        firstName: "Yvonne",
        lastName: "Peeters",
        phoneNumber: "753-333-4445"
      },
      {
        id: 13,
        firstName: "Leander",
        lastName: "Butler",
        phoneNumber: ""
      },
      { 
        id: 14,
        firstName: "David",
        lastName: "Holland",
        phoneNumber: "756-789-2325"
      },
      {
        id: 15,
        firstName: "Daisy",
        lastName: "Gurdler",
        phoneNumber: "734-444-5555"
      },
    ])
  }
}