import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactID: number;

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getContacts() {
    this
    .http
    .get<{message: string, contacts: Contact[]}>('http://localhost:3000/contacts')
    .subscribe((response: any) => {
      this.contacts = response.contacts;
      this.maxContactID = this.getMaxId();
      this.contacts.sort(
        (l: Contact, r: Contact)=> {
          if (l.id < r.id) {
            return -1;
          } else if (l.id === r.id) {
            return 0;
          } else {
            return 1;
          }
        }
      );
      this.contactListChangedEvent.next(this.contacts.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getContact(id: string): Contact {
    if (!this.contacts) {
      return null;
    }

    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }

    return null;
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const index = this.contacts.indexOf(contact);
    if (index < 0) {
      return;
    }

    this.http.delete(`http://localhost:3000/contacts/${contact.id}`)
    .subscribe((contacts: Contact[]) => {
      this.getContacts();
    })
  }

  addContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    contact.id = '';

    this.http
    .post<{message: string, contact: Contact}>('http://localhost:3000/contacts', contact, {headers: headers})
    .subscribe((response: any) => {
      this.contacts.push(response.contact);
      this.contacts.sort(
        (l: Contact, r: Contact)=> {
          if (l.id < r.id) {
            return -1;
          } else if (l.id === r.id) {
            return 0;
          } else {
            return 1;
          }
        }
      );
      this.contactChangedEvent.next(this.contacts.slice());
    });
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) {
      return;
    }

    let index = this.contacts.indexOf(originalContact);
    if (index < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strContact = JSON.stringify(newContact);

    this.http
    .put<{message: string}>(`http://localhost:3000/contacts/${originalContact.id}`, strContact, {headers: headers})
    .subscribe((response: any) => {
      this.getContacts();
    });
  }

  getMaxId(): number {
    let maxID = 0;
    for (let contact of this.contacts) {
      let currentID = +contact.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  storeContacts(contacts: Contact[]): any {
    let contactsJSON = JSON.stringify(contacts);
    const httpHeader = new HttpHeaders().set('content-type', 'application/json');

    this.http
      .put<Contact[]>(
        'http://localhost:3000/contacts',
        contactsJSON,
        { headers: httpHeader})
      .subscribe(() => {
        let contactsClone = [...this.contacts];
        this.contactListChangedEvent.next(contactsClone);
      }, (error: any) => {
        console.log(error);
      }
    );
  }
}