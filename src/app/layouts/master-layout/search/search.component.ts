import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private _visible: boolean;

  @Input() set visible(value: boolean) {
    this._visible = value;

    if (!value) this.isSearch = false;
  }

  get visible() {
    return this._visible;
  }

  @Input() enable: boolean;
  @Output() onSearch = new EventEmitter<string>();

  searchControl: UntypedFormControl = new UntypedFormControl();
  isSearch: boolean = false;

  @ViewChild('barSearchInput')
  set barSearchInput(value: ElementRef) {
    if (value) {
      setTimeout(() => {
        value.nativeElement.focus();
      });
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      this.close();
    } else if (event.code === 'Enter') {
      this.onSearch.emit(this.searchControl.value);
    }
  }

  open() {
    this.isSearch = true;
  }

  close() {
    this.isSearch = false;
  }
}
