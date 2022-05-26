import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/cms/win-ref.service';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  Contact: Contact;
  nativeWindow:any;

  constructor( private ContactService: ContactService,
               private windowRefService: WinRefService,
               private router: Router,
               private route: ActivatedRoute,
               ) {this.nativeWindow = windowRefService.getNativeWindow() };

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params)=>{
        this.Contact = this.ContactService.getContact(params['id']);
      }
    );
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onEditContact(){
    this.router.navigate(['edit'], {relativeTo:this.route});
  }

  onDelete(){
    this.ContactService.deleteContact(this.Contact);
    this.router.navigate(['/contacts']);
  }

}
