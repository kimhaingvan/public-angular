import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { ModalController } from '../../../../../../core/modal-controller/modal-controller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiOrderService } from '../../../../../../API/api-order.service';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderQuery } from 'src/app/states/order-store/order.query';
import { OrderService } from 'src/app/states/order-store/order.service';
import { OrderStore } from 'src/app/states/order-store/order.store';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnChanges {
  filter = {
    page : 1,
    per_page: 1000
  }

  borrow_status: any =  "Hoàn thành"  || "Trả trễ" || "Đang trễ" || "Đang mượn";
  isEditing = false;
  detail_order$ = this.OrderQuery.detail_order$;


  constructor(
    private OrderQuery: OrderQuery,
    private OrderService: OrderService,
    private router: Router,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private OrderStore: OrderStore) { }

    updateOrderForm = this.fb.group({
      order_id: [''],
      order_name: [''],
      author:[''],
      supplier: [''],
      category: [''],
      page_number: [''],
      cost_price: [''],
      retail_price: [''],
      discount: [''],
      old_amount: [''],
      new_amount: [''],
      description: [''],
      note: [''],
    });

  async ngOnInit() {
    await this.SetupData()
  }

  async ngOnChanges() {
  }

  async SetupData() {
    const order_id = {
      order_id: parseInt(this.route.snapshot.params['id'])
    }
    const res = await this.OrderService.searchOrders(order_id);
    const detail_order = res.orders[0];
    
    this.OrderService.setDetailOrder(detail_order);

    const current_date = new Date().getTime();
    const return_date = new Date(this.OrderQuery.getValue().detail_order.return_date).getTime();
    const appointment_date = new Date(this.OrderQuery.getValue().detail_order.appointment_date).getTime();
    if((!return_date && (current_date <= appointment_date))) {this.borrow_status =  "Đang mượn";}
    if((return_date && (return_date <= appointment_date))) {this.borrow_status =  "Hoàn thành";}
    if((!return_date && (current_date > appointment_date))) {this.borrow_status =  "Đang trễ";}
    if((return_date && (return_date > appointment_date))) {this.borrow_status =  "Trả trễ";}
  }

  async onClickUpdateBtn() {
    if(this.isEditing) {
      let update_order = this.updateOrderForm.value;
      await this.OrderService.UpdateOrder(update_order)
    } else {
      this.toggleEdit();
      this.setupDataForm();
    }
  }
    
  goBack() {
    if(this.isEditing) {
      this.toggleEdit()
    } else {
      this.router.navigateByUrl('admin/order-management/order-list')
    }
  }  

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onOpenDeleteModal() {
    const modal = this.modalController.create({
      component: ConfirmDeleteModalComponent,
      componentProps: {
        order: this.OrderQuery.getValue().detail_order
      },
    });
    modal.show().then();
    modal.onDismiss().then(delete_order => {
      if(delete_order) {
        try {
          this.OrderService.DeleteOrderById(delete_order.order_id)
          this.router.navigateByUrl('admin/order-management/order-list')
          toastr.success("Bạn đã hủy phiếu mượn sách thành công")
        } catch(e) {
          toastr.error("Bạn đã hủy phiếu mượn sách không thành thông", e.msg || e.message)
        }
      }
    });
  }

  setupDataForm() {
    let store_detail_order = this.OrderQuery.getValue().detail_order; 
    this.updateOrderForm.patchValue({
      'order_id': store_detail_order?.order_id,
      'order_name': store_detail_order?.order_name,
      'author': store_detail_order?.author,
      'supplier': store_detail_order?.supplier,
      'category': store_detail_order?.category,
      'page_number': store_detail_order?.page_number,
      'cost_price':  store_detail_order?.cost_price,
      'retail_price':store_detail_order?.retail_price,
      'discount':store_detail_order?.discount,
      'description': store_detail_order?.description,
      'old_amount': store_detail_order?.old_amount,
      'new_amount': store_detail_order?.new_amount,
      'note': store_detail_order?.note,
    });

  }
  

  async UpdateOrder() {
    let update_order = this.updateOrderForm.value;
    let update_req = {
      ...update_order,
      category_id: update_order.category.category_id,
      supplier_id: update_order.supplier.supplier_id,
      author_id: update_order.author.author_id,
    };
    try {
      let updated_order = await this.OrderService.UpdateOrder(update_req) 
      this.OrderStore.update({detail_order: updated_order})
      toastr.success("Cập nhật sách thành công.")
      this.router.navigateByUrl('admin/order-management/order-list')
    } catch(e) {
      toastr.error("Cập nhật sách thất bại.", e.msg || e.message)
    }
  }

  // async OnFinishOrder() {
  //   try {
  //     const modal = this.modalController.create({
  //       component: ConfirmFinishOrderModalComponent,
  //       componentProps: {
  //         order_id: this.OrderQuery.getValue().detail_order.order_id
  //       },
  //     });
  //     modal.show().then();
  //     modal.onDismiss().then(async finish_order_id => {
  //       if(finish_order_id) {
  //         try {
  //           await this.OrderService.FinishOrder(finish_order_id)
  //           this.router.navigateByUrl('admin/order-management/order-list')
  //           toastr.success("Hoàn thành phiếu mượn sách thành công");
  //         } catch(e) {
  //           toastr.error("Bạn đã hủy phiếu mượn sách không thành thông", e.msg || e.message)
  //         }
  //       }
  //     });
  //   } catch(e) {
  //     toastr.error("Hoàn thành phiếu mượn sách không thành công", e.msg || e.message)
  //   }
  // }

  get author() {
    return  this.OrderQuery.getValue().detail_order.author; 
  }
}
