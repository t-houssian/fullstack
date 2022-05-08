import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  @Input() Contact: Contact;

  constructor() { }

  ngOnInit(): void {
  }

}
