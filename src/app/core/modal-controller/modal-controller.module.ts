import { NgModule } from '@angular/core';
import { ModalController } from './modal-controller.service';
import { ModalContainerComponent } from './modal-container.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DialogControllerService } from './dialog-controller.service';
import { ModalAction } from './modal-action.service';
import { ModalComponent } from './modal.component';

@NgModule({
  entryComponents: [ModalContainerComponent, ModalComponent, DialogComponent],
  imports: [CommonModule],
  declarations: [ModalContainerComponent, ModalComponent, DialogComponent],
  providers: [ModalController, ModalAction, DialogControllerService],
  exports: [ModalContainerComponent],
})
export class ModalControllerModule {
}
