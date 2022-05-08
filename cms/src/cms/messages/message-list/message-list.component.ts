import { Component, OnInit, Output, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Input() messages: Message[] = [
    new Message(1,'Dallas Mavericks','Great game! Beat the Jazz!','J. Doe'),
    new Message(2,'Pheonix Suns','I will beat you now!','J. Doe'),
    new Message(3,'Dallas Mavericks','I Dont think so','J. Doe'),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(messages:Message) {
    this.messages.push(messages);
  }

}
