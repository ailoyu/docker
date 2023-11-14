import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  // Code ở dưới khi click vào button "Experiences" sẽ làm mất đèn ở dưới cụ thể class ".filter-button::before {}"
  isFilterButtonBeforeVisible = true;

  toggleFilterButtonBefore() {
    this.isFilterButtonBeforeVisible = !this.isFilterButtonBeforeVisible;
  }

  // Code ở dưới khi click vào button "Experiences" hiện bảng màu trắng và khi click lại sẽ ẩn bảng màu trắng
  isColorTableVisible: boolean = false;
  isColorTable2Visible: boolean = false;
  @ViewChild('colorTable') colorTable!: ElementRef;
  @ViewChild('colorTable2') colorTable2!: ElementRef;

  constructor() {}

  toggleColorTable() {
    this.isColorTableVisible = !this.isColorTableVisible;
    this.isColorTable2Visible = false;
    if (this.colorTable && this.colorTable2) {
      if (this.isColorTableVisible) {
        this.colorTable.nativeElement.style.display = 'block';
        this.colorTable2.nativeElement.style.display = 'none';
      } else {
        this.colorTable.nativeElement.style.display = 'none';
      }
    }
  }

  toggleColorTable2() {
    this.isColorTable2Visible = !this.isColorTable2Visible;
    this.isColorTableVisible = false;
    if (this.colorTable && this.colorTable2) {
      if (this.isColorTable2Visible) {
        this.colorTable2.nativeElement.style.display = 'block';
        this.colorTable.nativeElement.style.display = 'none';
      } else {
        this.colorTable2.nativeElement.style.display = 'none';
      }
    }
  }
}
