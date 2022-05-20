import { Component, OnInit,Input } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from 'src/cms/contacts/contact.model';
import { MessageService } from '../message.service';
import { ContactService } from 'src/cms/contacts/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message:Message;
  messageSender:string

  constructor(private MessageService:MessageService , private ContactService:ContactService) { }

  ngOnInit(): void {
    const contact: Contact = this.ContactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
