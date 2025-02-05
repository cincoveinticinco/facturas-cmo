import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-po-orders',
  standalone: true,
  imports: [],
  templateUrl: './po-orders.component.html',
  styleUrl: './po-orders.component.css'
})
export class PoOrdersComponent {

  @Input() invoiceNaturalForm!: FormGroup;
  @Input() poProjections: any[] = [];

  @Output() onClose = new EventEmitter<void>();
  @Output() onNotify = new EventEmitter<void>();

  getProjectionsForSelectedOrders() {
    const ids = this.invoiceNaturalForm.get('orderIds')?.value;
    const projections = this.poProjections.filter((projection: any) => ids.includes(projection.f_purchase_order_id.toString()
    ));
    return projections
  }

  fromNumberToCop(number: number) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(number);
  }

  close() {
    this.onClose.emit();
  }

  notify() {
    this.onNotify.emit();
  }

}
