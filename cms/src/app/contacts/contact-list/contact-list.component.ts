import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  contacts: Contact[] = [
  {
    id: '1',
    name: 'Bro. Jackson',
    email: "jacksonk@byui.edu",
    phone: "208-496-3771",
    imageUrl: "../../assets/images/jacksonk.jpg",
    group: null
  },
  {
    id: '2',
    name: "Bro. Barzee",
    email: "barzeer@byui.edu",
    phone: "208-496-3768",
    imageUrl: "../../assets/images/barzeer.jpg",
    group: null
  }]

}
