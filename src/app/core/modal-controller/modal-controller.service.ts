import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalOptions } from './modal.interface';
import { ModalContainerComponent } from './modal-container.component';

@Injectable({providedIn: 'root'})
export class ModalController {

  modalContainerHost: ViewContainerRef;

  constructor(private applicationRef: ApplicationRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector) {
    this._injectModalContainer();
  }

  getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  projectComponentInputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
    if(options) {
      const props = Object.getOwnPropertyNames(options);
      for(const prop of props) {
        component.instance[prop] = options[prop];
      }
    }

    return component;
  }

  private _injectModalContainer() {
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent).create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);
    let componentRootNode = this.getComponentRootNode(componentRef);

    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });

    this.modalContainerHost = componentRef.instance.viewContainer;

    document.body.appendChild(componentRootNode);
  }

  create<T = Type<any>>(options: ModalOptions) {
    if (!this.modalContainerHost) {
      throw new Error('Modal container not found');
    }
    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    let modalRef = this.modalContainerHost.createComponent(modalFactory);
    modalRef.instance.bootstrap(options);
    modalRef.instance.onDismiss().then((e) => {
      this.modalContainerHost.remove(this.modalContainerHost.indexOf(modalRef.hostView));
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(options.component);
    let componentRef = modalRef.instance.anchor.createComponent(componentFactory);
    componentRef = this.projectComponentInputs(componentRef, options.componentProps);
    modalRef.instance.injectComponent(componentRef);
    // let modal = new ModalComponent<T>(this.modalContainerHost, componentRef);
    return modalRef.instance;
  }
}
