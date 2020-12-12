import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class UtilService {
    numberOnly(event, allow_negative = false) {
        const num = Number(event.key);
        if (allow_negative && event.key == '-') {
            return true;
        }
        if (Number.isNaN(num)) {
            event.preventDefault();
            return false;
        }
    }

    validatePhoneNumber(phone: string) {
        if (!phone) {
            toastr.error('Vui lòng nhập số điện thoại hợp lệ!');
            return false;
        }
        if (phone.length < 10 && phone.length > 12) {
            toastr.error('Vui lòng nhập số điện thoại từ 10 đến 12 số!');
            return false;
        }
        if (phone.match(/^0[0-9]{9,10}$/)) {
            return true;
        }
        toastr.error('Vui lòng nhập số điện thoại hợp lệ!');
        return false;
    }
    validEmail(email: string) {
        if (!email) {
            toastr.error('Vui lòng nhập email hợp lệ!');
            return false;
        }
        if (
            email.match(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            return true;
        }
        toastr.error('Vui lòng nhập email hợp lệ!');
        return false;
    }

    formatCurrency(number) {
        if (!number) {
            return '0';
        }
        return number
            .toFixed()
            .replace(/./g, (c, i, a) =>
                i && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
            );
    }

    uniqueArray(arr) {
        let hash = {};
        let result = [];
        arr.forEach(item => (hash[item] = 1));
        for (let i in hash) {
          if (hash.hasOwnProperty(i) && hash[i] === 1) {
            result.push(i);
          }
        }
        return result;
    }

    isDuplicateExists(arr){ // kiem tra xem gia tri trong mang co trung hay kkhong? 
        return new Set(arr).size !== arr.length 
    }
}
