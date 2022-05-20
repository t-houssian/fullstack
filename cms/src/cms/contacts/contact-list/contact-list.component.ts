import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  collapsed=false;
   contacts: Contact[] = []
  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.ContactService.getContacts();
  }

  onSelected(contact:Contact){
    this.ContactService.contactSelectedEvent.emit(contact);
  }

}
