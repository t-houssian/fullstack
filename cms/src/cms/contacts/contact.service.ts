import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  maxContactID: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactID = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id:string): Contact {
    for(let contact of this.contacts){
      if (contact.id == id){
        return contact;
      }
      else()=>{
        return null;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId =0;
    for(const contact of this.contacts){
      const currentId = + contact.id;
  
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactID++;
    newContact.id = this.maxContactID.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
  
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0){ 
      return;
    }
  
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let documentsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(documentsListClone);
  }
}
