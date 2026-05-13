import { Injectable, signal, computed } from '@angular/core';
import { TranspoModel } from '../../shared/models/transpo-model';

export interface Vehicle extends TranspoModel {
    id: string;
    plateNumber: string;
    vehicleType: string;
    capacity: number;
    capacityUnit: string;
    driverId: string;
    driverName: string;
    lastMaintenance: Date;
}

@Injectable({ providedIn: 'root' })
export class VehicleService {
    private readonly _vehicles = signal<Vehicle[]>([]);

    public readonly vehicles = this._vehicles.asReadonly();
    public readonly activeVehicles = computed(() =>
        this._vehicles().filter(v => v.status === 'active')
    );
    public readonly totalVehicles = computed(() => this._vehicles().length);

    constructor() {
        this._loadMockData();
    }

    private _loadMockData(): void {
        this._vehicles.set([
            {
                id: 'V001', plateNumber: 'ABC-1234', vehicleType: 'Truck', capacity: 10,
                capacityUnit: 'tons', driverId: 'D001', driverName: 'Juan Dela Cruz',
                lastMaintenance: new Date('2025-03-15'), createdAt: new Date(), updatedAt: new Date(),
                createdBy: 'admin', updatedBy: 'admin', processFlow: 'standard', status: 'active',
                comments: null, flag: false
            },
            {
                id: 'V002', plateNumber: 'DEF-5678', vehicleType: 'Van', capacity: 2,
                capacityUnit: 'tons', driverId: 'D002', driverName: 'Maria Santos',
                lastMaintenance: new Date('2025-04-01'), createdAt: new Date(), updatedAt: new Date(),
                createdBy: 'admin', updatedBy: 'admin', processFlow: 'standard', status: 'active',
                comments: null, flag: false
            },
            {
                id: 'V003', plateNumber: 'GHI-9012', vehicleType: 'Truck', capacity: 8,
                capacityUnit: 'tons', driverId: 'D003', driverName: 'Pedro Reyes',
                lastMaintenance: new Date('2025-02-20'), createdAt: new Date(), updatedAt: new Date(),
                createdBy: 'admin', updatedBy: 'admin', processFlow: 'standard', status: 'maintenance',
                comments: null, flag: false
            },
            {
                id: 'V004', plateNumber: 'JKL-3456', vehicleType: 'Motorcycle', capacity: 0.5,
                capacityUnit: 'tons', driverId: 'D004', driverName: 'Ana Garcia',
                lastMaintenance: new Date('2025-04-10'), createdAt: new Date(), updatedAt: new Date(),
                createdBy: 'admin', updatedBy: 'admin', processFlow: 'express', status: 'active',
                comments: null, flag: false
            },
            {
                id: 'V005', plateNumber: 'MNO-7890', vehicleType: 'Truck', capacity: 12,
                capacityUnit: 'tons', driverId: 'D005', driverName: 'Carlos Bautista',
                lastMaintenance: new Date('2025-04-20'), createdAt: new Date(), updatedAt: new Date(),
                createdBy: 'admin', updatedBy: 'admin', processFlow: 'standard', status: 'active',
                comments: null, flag: false
            },
        ]);
    }
}
