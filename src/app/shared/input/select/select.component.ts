import { Component, Input } from '@angular/core';
import { AbstractInputComponent } from '../abstract-input';

@Component({
  selector: 'app-input-select',
  templateUrl: './select.component.html'
})
export class SelectComponent extends AbstractInputComponent<number | string> {
  @Input() items: any[];
  @Input() allowNull = false;
  @Input() suggestions: number[];

  // Add a property to hold the sorting order
  sortOrder: 'asc' | 'desc' = 'asc';

  // Function to sort options based on the current sortOrder
  sortedOptions(): any[] {
    if (!this.items) {
      return [];
    }

    // Clone the array to avoid modifying the original array
    const sortedItems = [...this.items];

    sortedItems.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (this.sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return sortedItems;
  }

  // Function to toggle the sorting order
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
}
