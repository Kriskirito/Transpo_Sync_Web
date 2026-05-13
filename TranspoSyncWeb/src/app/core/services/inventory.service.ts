import { Injectable, signal, computed } from '@angular/core';
import { TranspoModel } from '../../shared/models/transpo-model';

export interface InventoryItem extends TranspoModel {
    id: string;
    itemName: string;
    sku: string;
    quantity: number;
    unit: string;
    warehouseId: string;
    category: string;
    reorderLevel: number;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
    private readonly _items = signal<InventoryItem[]>([]);
    private readonly _loading = signal<boolean>(false);

    public readonly items = this._items.asReadonly();
    public readonly loading = this._loading.asReadonly();
    public readonly lowStockItems = computed(() =>
        this._items().filter(i => i.quantity <= i.reorderLevel)
    );
    public readonly totalItems = computed(() => this._items().length);

    constructor() {
        this._loadMockData();
    }

    private _loadMockData(): void {
        this._items.set([
            {
                id: '1', itemName: 'Packing Boxes (Large)', sku: 'PKG-L-001', quantity: 150,
                unit: 'pcs', warehouseId: 'WH1', category: 'Packaging', reorderLevel: 50,
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
            {
                id: '2', itemName: 'Bubble Wrap Roll', sku: 'PKG-BW-002', quantity: 30,
                unit: 'rolls', warehouseId: 'WH1', category: 'Packaging', reorderLevel: 40,
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
            {
                id: '3', itemName: 'Pallet (Standard)', sku: 'STR-P-001', quantity: 85,
                unit: 'pcs', warehouseId: 'WH2', category: 'Storage', reorderLevel: 20,
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
            {
                id: '4', itemName: 'Strapping Tape', sku: 'PKG-ST-003', quantity: 12,
                unit: 'rolls', warehouseId: 'WH1', category: 'Packaging', reorderLevel: 20,
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
            {
                id: '5', itemName: 'Forklift Fuel (Diesel)', sku: 'EQP-FL-001', quantity: 200,
                unit: 'liters', warehouseId: 'WH2', category: 'Equipment', reorderLevel: 100,
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
            {
                id: '6', itemName: 'Cable Ties (Pack)', sku: 'EQP-CT-002', quantity: 18,
                unit: 'packs', warehouseId: 'WH2', category: 'Equipment', reorderLevel: 25,
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
        ]);
    }
}
