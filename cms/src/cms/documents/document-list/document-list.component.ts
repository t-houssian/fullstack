import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1','Test Document','dummy1', 'https://www.test.com/','',),
    new Document('2','Test Document','dummy2', 'https://www.test.com/','',),
    new Document('3','Test Document','dummy3', 'https://www.test.com/','',),
    new Document('4','Test Document','dummy4', 'https://www.test.com/','',),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document:Document){
    this.selectedDocumentEvent.emit(document);
  }

}
