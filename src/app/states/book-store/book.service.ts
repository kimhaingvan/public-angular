import { ApiCategoryService } from './../../API/api-book-category.service';
import { filter_page } from 'src/app/models/app-models';
import { BookQuery } from './book.query';
import { BookStore } from './book.store';
import { GetItemsByPageRsp } from './../../models/resp';
import { ApiBookService } from './../../API/api-book.service';
import { Injectable } from '@angular/core';
import { NavigationDirection } from 'src/app/shared/page-pagination/page-pagination.component';
import { ApiAuthorService } from 'src/app/API/api-author.service';
import { ApiSupplierService } from 'src/app/API/api-supplier.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    constructor(private bookApiService: ApiBookService, private bookStore: BookStore, private bookQuery: BookQuery, private categoryApiService: ApiCategoryService, private authorApiService: ApiAuthorService, private supplierApiService: ApiSupplierService) {
    }

    async getBooks(filter) {
        let res: GetItemsByPageRsp = await this.bookApiService.GetBooks(filter);
        this.bookStore.update({
            book_list_view: res,
        })
    }

    setupPagination() {
        this.bookStore.update({
            current_pagination_opt: {
                hidePerpage: true,
                nextDisabled:  !this.bookQuery.getValue().book_list_view.has_next,
                previousDisabled: !this.bookQuery.getValue().book_list_view.has_prev,
            }
        })
    }

    navigate(direction) {
        let store_data =  this.bookQuery.getValue();
        switch (direction) {
            case NavigationDirection.BACKWARD:
                this.bookStore.update({current_page: store_data.current_page-1});
                break;
            case NavigationDirection.FORWARD:
                this.bookStore.update({current_page: store_data.current_page+1});
                break;
        }
        this.bookStore.update({current_page: this.bookQuery.getValue().current_page <= 0 ? 1 :  this.bookQuery.getValue().current_page});
        let currentPage = this.bookQuery.getValue().current_page <= 0 ? 1 : this.bookQuery.getValue().current_page;
        let filter = {
            ...this.bookQuery.getValue().filter_page,
            page: currentPage
        };
        this.bookStore.update({filter_page: filter});
    }

    async searchBooks(req) {
        return await this.bookApiService.SearchBooks(req);
    }

    setDetailBook(book) {
        this.bookStore.update({detail_book: book})
    }

    async DeleteBookById(id) {
        return await this.bookApiService.DeleteBook({book_id: id});
    }

    async UpdateBook(book) {
        return await this.bookApiService.UpdateBook(book);
    }

    async GetCategories(filter) {
        let category_res = await this.categoryApiService.GetCategories(filter);
        this.bookStore.update({categories: category_res['items']})
    }

    async GetAuthors(filter) {
        let author_res = await this.authorApiService.GetAuthors(filter);
        this.bookStore.update({authors: author_res['items']});
    }

    async GetSuppliers(filter) {
        let supplier_res = await this.supplierApiService.GetSuppliers(filter)
        this.bookStore.update({suppliers: supplier_res['items']});
    }

    async CreateAuthor(author) {
        return await this.authorApiService.CreateAuthor(author)
    }
    async CreateCategory(category) {
        return await this.categoryApiService.CreateCategory(category)
    }
    async CreateSupplier(supplier) {
        return await this.supplierApiService.CreateSupplier(supplier)
    }

    async CreateBook(book) {
        return await this.bookApiService.CreateBook(book)
    }

    async UploadBookImage(imageFile) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data',
            })
          };
          let formData: FormData = new FormData();
          formData.append('file', imageFile);
        await this.bookApiService.UpdateBookImage(formData, httpOptions);
    }
}
