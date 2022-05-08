import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  collapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSelected(selectedEvent:string){
  this.selectedFeatureEvent.emit(selectedEvent);
  
  }

}
