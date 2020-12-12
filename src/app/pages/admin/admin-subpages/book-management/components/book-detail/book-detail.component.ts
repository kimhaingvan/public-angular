import { BookStore } from './../../../../../../states/book-store/book.store';
import { BookQuery } from 'src/app/states/book-store/book.query';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { ModalController } from './../../../../../../core/modal-controller/modal-controller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiBookService } from './../../../../../../API/api-book.service';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BookService } from 'src/app/states/book-store/book.service';
import { AddSupplierModalComponent } from '../add-supplier-modal/add-supplier-modal.component';
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component';
import { AddAuthorModalComponent } from '../add-author-modal/add-author-modal.component';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnChanges {
  filter = {
    page : 1,
    per_page: 1000
  }

  isEditing = false;
  detail_book$ = this.bookQuery.detail_book$;
  authors$ = this.bookQuery.authors$;
  categories$ = this.bookQuery.categories$;
  suppliers$ = this.bookQuery.suppliers$;


  constructor(
    private bookQuery: BookQuery,
    private bookService: BookService,
    private router: Router,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private bookStore: BookStore,
    private http: HttpClient,
  ) { }

    updateBookForm = this.fb.group({
      book_id: [''],
      book_name: [''],
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
      image: '',
      note: [''],
    });

  async ngOnInit() {
    const book_id = {
      book_id: parseInt(this.route.snapshot.params['id'])
    }
    const res = await this.bookService.searchBooks(book_id);
    const detail_book = res.books[0];
    this.bookService.setDetailBook(detail_book);
    await this.SetupData()
  }

  async ngOnChanges() {
  }

  async SetupData() {
    await this.bookService.GetAuthors(this.filter);
    await this.bookService.GetCategories(this.filter);
    await this.bookService.GetSuppliers(this.filter);
  }

  async onClickUpdateBtn() {
    if(this.isEditing) {
      let update_book = this.updateBookForm.value;
      await this.bookService.UpdateBook(update_book)
    } else {
      this.toggleEdit();
      this.setupDataForm();
    }
  }

  goBack() {
    if(this.isEditing) {
      this.toggleEdit()
    } else {
      this.router.navigateByUrl('admin/book-management/book-list')
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onOpenDeleteModal() {
    const modal = this.modalController.create({
      component: ConfirmDeleteModalComponent,
      componentProps: {
        book: this.bookQuery.getValue().detail_book
      },
    });
    modal.show().then();
    modal.onDismiss().then(delete_book => {
      if(delete_book) {
        try {
          this.bookService.DeleteBookById(delete_book.book_id)
          this.router.navigateByUrl('admin/book-management/book-list')
          toastr.success("Bạn đã xóa sách thành công")
        } catch(e) {
          toastr.error("Xóa sách không thành thông", e.msg || e.message)
        }
      }
    });
  }

  setupDataForm() {
    let store_detail_book = this.bookQuery.getValue().detail_book;
    this.updateBookForm.patchValue({
      'book_id': store_detail_book?.book_id,
      'book_name': store_detail_book?.book_name,
      'author': store_detail_book?.author,
      'supplier': store_detail_book?.supplier,
      'category': store_detail_book?.category,
      'page_number': store_detail_book?.page_number,
      'cost_price':  store_detail_book?.cost_price,
      'retail_price':store_detail_book?.retail_price,
      'discount':store_detail_book?.discount,
      'description': store_detail_book?.description,
      'old_amount': store_detail_book?.old_amount,
      'new_amount': store_detail_book?.new_amount,
      'note': store_detail_book?.note,
      'image': store_detail_book?.image,

    });

  }

  OpenAddAuthorModal() {
    const modal = this.modalController.create({
      component: AddAuthorModalComponent,
      componentProps: {
      },
    });
    modal.show().then();
    modal.onDismiss().then(async author =>  {
      if(author) {
        try {
          await this.bookService.CreateAuthor(author);
          await this.bookService.GetAuthors(this.filter);
          toastr.success("Thêm mới tác giả thành công.")
        } catch(e) {
          toastr.error("Thêm mới tác giả thất bại.", e.msg || e.message)
        }

      }
    });
  }

  OpenAddCategoryModal() {
    // let createBookForm = this.createBookForm.value;
    const modal = this.modalController.create({
      component: AddCategoryModalComponent,
      cssClass: 'modal-lg',
      componentProps: {
      },
    });
    modal.show().then();
    modal.onDismiss().then(async category =>  {
      if(category) {
        try {
          await this.bookService.CreateCategory(category);
          await this.bookService.GetCategories(this.filter);
          toastr.success("Thêm mới thể loại sách thành công.")
        } catch(e) {
          toastr.error("Thêm mới thể loại sách thất bại.", e.msg || e.message)
        }

      }
    });
  }

  OpenAddSupplierModal() {
    const modal = this.modalController.create({
      component: AddSupplierModalComponent,
      cssClass: 'modal-xl',
      componentProps: {
      },
    });
    modal.show().then();
    modal.onDismiss().then(async supplier =>  {
      if(supplier) {
        try {
          await this.bookService.CreateSupplier(supplier);
          await this.bookService.GetSuppliers(this.filter);
          toastr.success("Thêm mới nhà cung cấp thành công.")
        } catch(e) {
          toastr.error("Thêm mới nhà cung cấp thất bại.", e.msg || e.message)
        }
      }
    });
  }

  get book_detail_in_store() {

    return this.bookQuery.getValue().detail_book.supplier.supplier_id
  }
  async UpdateBook() {
    let update_book = this.updateBookForm.value;
    let update_req = {
      ...update_book,
      category_id: update_book.category.category_id,
      supplier_id: update_book.supplier.supplier_id,
      author_id: update_book.author.author_id,
    };
    try{
      let updated_book = await this.bookService.UpdateBook(update_req)
      this.bookStore.update({detail_book: updated_book})
      toastr.success("Cập nhật sách thành công.")
      this.router.navigateByUrl('admin/book-management/book-list')
    } catch(e) {
      toastr.error("Cập nhật sách thất bại.", e.msg || e.message)
    }
  }

  get author() {
    return  this.bookQuery.getValue().detail_book.author;
  }

  async onChangeLogo(event) {
    try{
      let fd = new FormData();
      fd.append('image', event.target.files[0], event.target.files[0].name)
      let res : any = await this.http.post('http://localhost:5000/admin/book-management/upload-book-image', fd).toPromise();
      this.updateBookForm.patchValue({
        image: res.image
      })
    }
    catch(e){
      toastr.error("Cập nhật ảnh thất bại!", e.msg || e.message)
    }
  }
}
