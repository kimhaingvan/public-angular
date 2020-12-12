import { Injectable } from '@angular/core';

@Injectable()
export class ModalAction {
  dismiss(e) {
    throw new Error('Method not implemented');
  }
  show() {
    throw new Error('Method not implemented');
  }
  close(dismiss?: boolean, data?: any) {
    throw new Error('Method not implemented');
  }
}
