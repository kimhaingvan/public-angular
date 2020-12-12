import { ModalOptions } from './modal.interface';
import { Subject } from 'rxjs';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ModalAction } from './modal-action.service';

@Component({
  selector: 'core-modal',
  template: `
      <div class="modal" [ngClass]="{'fade': modalOptions.animated}" #modal>
          <div class="modal-dialog {{modalOptions.cssClass}}"
               [ngClass]="{'modal-dialog-centered': modalOptions.centered}"
               role="document">
              <div class="modal-content">
                  <ng-container #anchor></ng-container>
              </div>
          </div>
      </div>
  `
})
export class ModalComponent<T = Type<any>> implements AfterViewInit {

  @ViewChild('modal', { static: true }) modal: ElementRef;
  @ViewChild('anchor', { read: ViewContainerRef, static: true }) anchor: ViewContainerRef;

  componentRef: ComponentRef<T>;
  modalOptions: Partial<ModalOptions> = {
    showBackdrop: true,
    animated: true
  };

  constructor() {
  }

  private isDismissed = false;
  private dismissData;
  private _onDismiss = new Subject();
  private _onShowing = new Subject();
  private _onShowed = new Subject();
  private _onClosing = new Subject();
  private _onClosed = new Subject();

  private _dismiss(data?) {
    this.dismissData = data;
    this.isDismissed = true;
    this._onDismiss.next(data);
  }

  bootstrap(options: ModalOptions) {
    this.modalOptions = Object.assign({}, this.modalOptions, options);
  }

  ngAfterViewInit(): void {
    const $modal = $(this.modal.nativeElement);
    $modal.on('show.bs.modal', (e) => {
      this._onShowing.next(e);
    });
    $modal.on('shown.bs.modal', (e) => {
      this._onShowed.next(e);
    });
    $modal.on('hide.bs.modal', (e) => {
      this._onClosing.next(e);
    });
    $modal.on('hidden.bs.modal', (e) => {
      this._onClosed.next(e);
    });
  }

  show() {
    return new Promise(res => {
      setTimeout(() => $(this.modal.nativeElement).modal({
        backdrop: this.modalOptions.showBackdrop,
        keyboard: false,
        focus: true
      }));
      let shown$ = this._onShowed.subscribe((e) => {
        res(e);
        shown$.unsubscribe();
      });
    });
  }

  close(permanent = false) {
    return new Promise(res => {
      setTimeout(() => $(this.modal.nativeElement).modal('hide'));
      let shown$ = this._onClosed.subscribe((e) => {
        if (permanent) {
          this._dismiss();
        }
        res(e);
        shown$.unsubscribe();
      });
    });
  }

  onClosed() {
    return new Promise(res => {
      $(this.modal.nativeElement).on('hidden.bs.modal', (e) => {
        res(e);
      });
    });
  }

  onDismiss(): Promise<any> {
    if (this.isDismissed) {
      return this.dismissData;
    }
    return new Promise<any>((res, rej) => {
      let dismiss$ = this._onDismiss.subscribe(data => {
        res(data);
        dismiss$.unsubscribe();
      });
    });
  }

  public injectComponent(component: ComponentRef<T>) {
    const viewRef = this.anchor;
    this.componentRef = component;
    this.componentRef.onDestroy(() => {
      viewRef.detach(viewRef.indexOf(this.componentRef.hostView));
    });
    let modalAction = new ModalAction();
    modalAction.dismiss = (data) => {
      this.close(false);
      this._dismiss(data);
    };
    modalAction.close = (dismiss = true, data) => {
      this.close(false).then();
      if (dismiss) {
        this._dismiss(data);
      }
    };
    modalAction.show = () => {
      this.show().then();
    };
    Object.getOwnPropertyNames(this.componentRef.instance)
      .forEach(name => {
        if (this.componentRef.instance[name] instanceof ModalAction) {
          this.componentRef.instance[name] = modalAction;
        }
      });
  }
}
