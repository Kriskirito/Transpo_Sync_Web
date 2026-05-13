import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, InventoryItem } from '../../../core/services/inventory.service';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-inventory-list',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollDirective],
    templateUrl: './inventory-list.component.html',
    styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent implements OnInit {
    private readonly inventoryService = inject(InventoryService);

    public readonly items = this.inventoryService.items;
    public readonly lowStockItems = this.inventoryService.lowStockItems;
    public readonly loading = this.inventoryService.loading;
    public searchTerm = signal<string>('');

    public readonly filteredItems = computed(() => {
        const term = this.searchTerm().toLowerCase();
        if (!term) return this.items();
        return this.items().filter(i =>
            i.itemName.toLowerCase().includes(term) ||
            i.sku.toLowerCase().includes(term) ||
            i.category.toLowerCase().includes(term)
        );
    });

    ngOnInit(): void {}

    onSearch(event: Event): void {
        this.searchTerm.set((event.target as HTMLInputElement).value);
    }

    isLowStock(item: InventoryItem): boolean {
        return item.quantity <= item.reorderLevel;
    }

    getStockPercentage(item: InventoryItem): number {
        const max = item.reorderLevel * 3;
        return Math.min(Math.round((item.quantity / max) * 100), 100);
    }

    trackById(_index: number, item: InventoryItem): string {
        return item.id;
    }
}
