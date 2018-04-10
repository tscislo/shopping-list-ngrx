import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../product.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() public products: Product[];
  @Output() public removeProduct = new EventEmitter();
  @Output() public quantityPlus = new EventEmitter();
  @Output() public  quantityMinus = new EventEmitter();
  @Output() public buy = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
