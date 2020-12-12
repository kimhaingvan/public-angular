import { Type } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';

export interface ComponentProps {[key: string]: any}

export interface ModalOptions<T = Type<any>> {
  component: T;
  componentProps?: ComponentProps;
  showBackdrop?: boolean | 'static';
  cssClass?: string | string[];
  animated?: boolean;
  centered?: boolean;
  id?: string;
}

export interface DialogButton {
  title: string;
  cssClass: string;
  onClick: () => void;
  loading?: boolean;
}

export interface DialogOptions {
  title?: string;
  body: string | Type<any>;
  buttons: Array<DialogButton>;
}

export interface ConfirmDialogOptions {
  title?: string;
  body: string;
  confirmTitle?: string;
  cancelTitle?: string;
  confirmCss?: string;
  cancelCss?: string;
  onConfirm?: () => any;
  onCancel?: () => any;
  closeAfterAction?: boolean;
}
