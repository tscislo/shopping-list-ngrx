import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemComponent implements OnInit {
    public itemName: string;

    @Output() itemAdded = new EventEmitter();
    @Input() type: string;

    constructor() {
    }

    ngOnInit() {
    }

    public addItem() {
        if (this.itemName) {
            this.itemAdded.emit(this.itemName);
            this.itemName = null;
        }
    }

}
