import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../../../core/services/inventory.service';
import { StatusBadgePipe } from '../../../shared/pipes/status-badge.pipe';

@Component({
    selector: 'app-inventory-list',
    standalone: true,
    imports: [CommonModule, FormsModule, StatusBadgePipe],
    templateUrl: './inventory-list.component.html',
    styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent implements OnInit {
    private readonly inventoryService = inject(InventoryService);

    public readonly items = this.inventoryService.items;
    public readonly lowStockItems = this.inventoryService.lowStockItems;
    public readonly loading = this.inventoryService.loading;

    public searchQuery = signal<string>('');
    public selectedWarehouse = signal<string>('');
    public showLowStockOnly = signal<boolean>(false);

    public readonly warehouses = computed(() =>
        [...new Set(this.items().map(i => i.warehouseId).filter(Boolean))]
    );

    public readonly categoryCount = computed(() =>
        new Set(this.items().map(i => i.category)).size
    );

    public readonly warehouseCount = computed(() => this.warehouses().length);

    public readonly lowStockCount = computed(() =>
        this.items().filter(i => i.quantity <= i.reorderLevel).length
    );

    public readonly filteredItems = computed(() => {
        const term = this.searchQuery().toLowerCase();
        const wh = this.selectedWarehouse();
        const lowOnly = this.showLowStockOnly();
        return this.items().filter(item => {
            const matchesTerm = !term ||
                item.itemName.toLowerCase().includes(term) ||
                item.sku.toLowerCase().includes(term) ||
                item.category.toLowerCase().includes(term) ||
                item.warehouseId.toLowerCase().includes(term);
            const matchesWh = !wh || item.warehouseId === wh;
            const matchesLow = !lowOnly || item.quantity <= item.reorderLevel;
            return matchesTerm && matchesWh && matchesLow;
        });
    });

    ngOnInit(): void {}

    setSearchQuery(value: string): void {
        this.searchQuery.set(value);
    }

    setWarehouseFilter(value: string): void {
        this.selectedWarehouse.set(value);
    }

    toggleLowStockFilter(): void {
        this.showLowStockOnly.update(v => !v);
    }

    isLowStock(item: InventoryItem): boolean {
        return item.quantity <= item.reorderLevel;
    }

    getStockPercentage(item: InventoryItem): number {
        const max = Math.max(item.reorderLevel * 3, item.quantity);
        if (max === 0) return 0;
        return Math.min(Math.round((item.quantity / max) * 100), 100);
    }

    trackById(_index: number, item: InventoryItem): string {
        return item.id;
    }
}
