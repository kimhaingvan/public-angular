import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'core-modal-container',
  template: `
    <div class="modal-container" #modalContainer></div>
  `,
})

export class ModalContainerComponent {
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true }) viewContainer;
}
