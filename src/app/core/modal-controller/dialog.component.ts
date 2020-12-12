import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogButton } from './modal.interface';
import { ModalAction } from './modal-action.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'core-dialog',
  template: `
    <div class="modal-header" *ngIf="title">
      <h5 class="modal-title">{{title}}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true" class="text-large" (click)="close()">&times;</span>
      </button>
    </div>
    <div class="modal-body" [innerHTML]="safeHtml(body)"></div>
    <div class="modal-footer">
      <button *ngFor="let button of buttons"
              [ngClass]="button.cssClass"
              (click)="button?.onClick()"
              [disabled]="button.loading"
              type="button" class="btn">
          <i *ngIf="button.loading" class="fa fa-spin fa-circle-o-notch mr-2"></i>{{button.title}}</button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})

export class DialogComponent implements OnInit {

  @Input() title: string;
  @Input() body: string;
  @Input() buttons: Array<DialogButton>;

  constructor(private modalDismiss: ModalAction, private sanitizer:DomSanitizer) {
  }

  ngOnInit() {
  }

  safeHtml(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  close() {
    this.modalDismiss.dismiss(null);
  }

  dismiss(value) {
    this.modalDismiss.dismiss(value);
  }
}
