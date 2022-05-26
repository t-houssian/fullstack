import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = []

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
    this.ContactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts.slice();
    });
    this.contacts = this.ContactService.getContacts();
  }

  onSelected(contact:Contact){
    this.ContactService.contactSelectedEvent.emit(contact);
  }

}
