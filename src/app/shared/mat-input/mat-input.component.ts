import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mat-input',
  templateUrl: './mat-input.component.html',
  styleUrls: ['./mat-input.component.scss']
})
export class MatInputComponent implements OnInit {
  @Input() type : string = "input" || 'auto-complete';
  @Input() placeholder : string ="Placeholder mặc định";
  @Input() options: string[];
  @Input() canAdd : boolean = false;
  @Input() label: string = "Label mặc định"
  @Output() openModal = new EventEmitter();

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onOpenModal() {
    this.openModal.emit();
  }
}
