import { ModalController } from '../../../../../../../core/modal-controller/modal-controller.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OrderService } from 'src/app/states/order-store/order.service';
import { OrderQuery } from 'src/app/states/order-store/order.query';

@Component({
  selector: 'app-order-row',
  templateUrl: './order-row.component.html',
  styleUrls: ['./order-row.component.scss']
})
export class OrderRowComponent implements OnInit, OnChanges {
  @Input() order_item;
  @Input() index;

  borrow_status: any =  "Hoàn thành"  || "Trả trễ" || "Đang trễ" || "Đang mượn";
  constructor(
    private OrderService: OrderService,
    private OrderQuery: OrderQuery,
    private modalController: ModalController,
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    const current_date = new Date().getTime();
    const return_date = new Date(this.order_item.return_date).getTime();
    const appointment_date = new Date(this.order_item.appointment_date).getTime();
    if((!return_date && (current_date <= appointment_date))) {this.borrow_status =  "Đang mượn";}
    if((return_date && (return_date <= appointment_date))) {this.borrow_status =  "Hoàn thành";}
    if((!return_date && (current_date > appointment_date))) {this.borrow_status =  "Đang trễ";}
    if((return_date && (return_date > appointment_date))) {this.borrow_status =  "Trả trễ";}
  }

  // async FinishOrder() {
  //   const modal = this.modalController.create({
  //     component: ConfirmFinishOrderModalComponent,
  //     componentProps: {
  //       order_id: this.order_item.order_id
  //     },
  //   });
  //   modal.show().then();
  //   modal.onDismiss().then(async order_id => {
  //     if(order_id) {
  //       try {
  //         await this.OrderService.FinishOrder(this.order_item.order_id);
  //         await this.OrderService.getOrders(this.OrderQuery.getValue().filter_page)
  //         toastr.success("Hoàn thành phiếu mượn sách thành công")
  //       } catch(e) {
  //         toastr.error("Hoàn thành phiếu mượn sáchkhông thành thông", e.msg || e.message)
  //       }
  //     }
  //   });
    
  // }
}
