import { Injectable, signal, computed } from '@angular/core';
import { TranspoModel } from '../../shared/models/transpo-model';

export type ShipmentStatus = 'pending' | 'in-transit' | 'delivered' | 'failed';

export interface Shipment extends TranspoModel {
    id: string;
    trackingNumber: string;
    senderName: string;
    receiverName: string;
    origin: string;
    destination: string;
    weight: number;
    shipmentStatus: ShipmentStatus;
    estimatedDelivery: Date;
    vehicleId: string;
}

@Injectable({ providedIn: 'root' })
export class ShipmentService {
    private readonly _shipments = signal<Shipment[]>([]);

    public readonly shipments = this._shipments.asReadonly();
    public readonly inTransitShipments = computed(() =>
        this._shipments().filter(s => s.shipmentStatus === 'in-transit')
    );
    public readonly pendingShipments = computed(() =>
        this._shipments().filter(s => s.shipmentStatus === 'pending')
    );
    public readonly deliveredShipments = computed(() =>
        this._shipments().filter(s => s.shipmentStatus === 'delivered')
    );
    public readonly totalShipments = computed(() => this._shipments().length);

    constructor() {
        this._loadMockData();
    }

    private _loadMockData(): void {
        this._shipments.set([
            {
                id: '1', trackingNumber: 'TSW-2025-001', senderName: 'ABC Corp', receiverName: 'XYZ Ltd',
                origin: 'Manila', destination: 'Cebu', weight: 250, shipmentStatus: 'in-transit',
                estimatedDelivery: new Date('2025-05-15'), vehicleId: 'V001',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
            {
                id: '2', trackingNumber: 'TSW-2025-002', senderName: 'DEF Industries', receiverName: 'GHI Trading',
                origin: 'Davao', destination: 'Cagayan', weight: 80, shipmentStatus: 'pending',
                estimatedDelivery: new Date('2025-05-16'), vehicleId: 'V002',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
            {
                id: '3', trackingNumber: 'TSW-2025-003', senderName: 'JKL Supplies', receiverName: 'MNO Retail',
                origin: 'Iloilo', destination: 'Bacolod', weight: 120, shipmentStatus: 'delivered',
                estimatedDelivery: new Date('2025-05-13'), vehicleId: 'V003',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'express', status: 'completed', comments: null, flag: false
            },
            {
                id: '4', trackingNumber: 'TSW-2025-004', senderName: 'PQR Exports', receiverName: 'STU Imports',
                origin: 'Zamboanga', destination: 'Cotabato', weight: 350, shipmentStatus: 'in-transit',
                estimatedDelivery: new Date('2025-05-14'), vehicleId: 'V004',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
            {
                id: '5', trackingNumber: 'TSW-2025-005', senderName: 'VWX Corp', receiverName: 'YZA Ltd',
                origin: 'Manila', destination: 'Davao', weight: 500, shipmentStatus: 'pending',
                estimatedDelivery: new Date('2025-05-17'), vehicleId: 'V001',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
        ]);
    }
}
