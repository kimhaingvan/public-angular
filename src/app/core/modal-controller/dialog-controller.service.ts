import { Injectable, Type } from '@angular/core';
import { ModalController } from './modal-controller.service';
import { ConfirmDialogOptions, DialogOptions, ModalOptions } from './modal.interface';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogControllerService {

  constructor(private modalController: ModalController) {
  }

  create(options: DialogOptions) {
    return this.modalController.create({
      component: DialogComponent,
      componentProps: options
    });
  }

  createConfirmDialog(options: ConfirmDialogOptions) {
    const buttons = [
      {
        title: options.cancelTitle || 'Bỏ qua',
        cssClass: options.cancelCss || 'btn-outline btn-default',
        onClick: async function () {
          if (options.onCancel) {
            this.loading = true;
            await options.onCancel();
            this.loading = false;
          }
          if (!options.closeAfterAction) {
            (dialog.componentRef.instance as any).dismiss(false);
          }
        }
      },
      {
        title: options.confirmTitle || 'Xác nhận',
        cssClass: options.confirmCss || 'btn-primary',
        onClick: async function () {
          if (options.onConfirm) {
            this.loading = true;
            await options.onConfirm();
            this.loading = false;
          }
          if (options.closeAfterAction) {
            (dialog.componentRef.instance as any).dismiss(true);
          }
        }
      }
    ];
    let dialog = this.create({
      title: options.title,
      body: options.body,
      buttons: buttons
    });
    return dialog;
  }
}
