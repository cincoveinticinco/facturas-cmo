import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-po-orders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './po-orders.component.html',
  styleUrl: './po-orders.component.css'
})
export class PoOrdersComponent {

  @Input() invoiceNaturalForm!: FormGroup;
  @Input() poProjections: any[] = [];

  @Output() onClose = new EventEmitter<void>();
  @Output() onNotify = new EventEmitter<void>();


  poOrdersTotals = {
    taxes_addition_value: 0,
    taxes_not_addition_value: 0,
    value: 0,
    total: 0
  }

  getProjectionsForSelectedOrders() {
    const ids = this.invoiceNaturalForm.get('orderIds')?.value;
    const projections = this.poProjections.filter((projection: any) => ids.includes(projection.f_purchase_order_id.toString()
    ));

    this.poOrdersTotals.taxes_addition_value = this.getTotalProjections(projections, 'taxes_addition_value');
    this.poOrdersTotals.taxes_not_addition_value = this.getTotalProjections(projections, 'taxes_not_addition_value');
    this.poOrdersTotals.value = this.getTotalProjections(projections, 'value');
    this.poOrdersTotals.total = this.getTotalProjections(projections, 'total');

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


  getTotalProjections(projections: any[], property: string) {
    return projections.reduce((acc: number, projection: any) => {
      const value = parseFloat(projection[property]);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
  }

}
