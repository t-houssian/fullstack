import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/cms/win-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  documents: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService, 
    private router: Router, 
    private route: ActivatedRoute,
    private WindRefService: WinRefService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.documents = this.documentService.getDocument(params['id']);
      }
    );

    this.nativeWindow = this.WindRefService.getNativeWindow();
  }

  onView()  {
    if(this.documents.url)  {
      this.nativeWindow.open(this.documents.url);
    }
  }

  onDelete()  {
    this.documentService.deleteDocument(this.documents);
    this.router.navigate(['/documents']);
  }

}
