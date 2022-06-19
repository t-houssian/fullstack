import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = []
  subscription: Subscription;
  term: string = '';

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
    this.ContactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts.slice();
    });
    this.subscription = this.ContactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
    console.log(this.term);
  }
}
