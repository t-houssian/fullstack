import { Component, OnInit,Input, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  collapsed=false;
  @Input() contacts:Contact;
    

  

  constructor() { }

  ngOnInit(): void {
    
  }

}
