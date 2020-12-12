import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'standardizedId'
})
export class standardizedId implements PipeTransform {
  transform(id: any): any {
    let preNum = "#";

    if(typeof id == "string") {
      id = parseInt(id)
    }

    if(id < 10){
      preNum = "#00000";
    } else if (id < 100){
      preNum = "#0000";
    } else if (id < 1000){
      preNum = "#000";
    } else if (id < 10000){
      preNum = "#00";
    } else if (id < 100000) {
      preNum = "#0";
    } else {
      preNum ="#";
    }
    return preNum + id;
  }

}

@Pipe({
  name: 'vnd'
})
@Injectable()
export class VND implements PipeTransform {
  transform(value: any): string {
    if (typeof value != "number" && typeof value != "string") {
      return value;
    }
    if (typeof value == "string") {
      value = Number(value);
    }
    const valueString = value < 0 ?  (-value).toString() : value.toString();

    if (valueString.includes(".")) {
      const wholePart = valueString.split(".")[0]
        .replace(/./g, (match, p1, p2) => {
          return p1 && match !== "," && ((p2.length - p1) % 3 === 0) ? '.' + match : match;
        });
      const decimalPart = valueString.split(".")[1];

      return `${value < 0 ? '-' : ''}${wholePart},${decimalPart}`;
    } else {
      const result = valueString.replace(/./g, (match, p1, p2) => {
        return p1 && match !== "," && ((p2.length - p1) % 3 === 0) ? '.' + match : match;
      });
      return `${value < 0 ? '-' : ''}${result} đ`;
    }
  }
}
