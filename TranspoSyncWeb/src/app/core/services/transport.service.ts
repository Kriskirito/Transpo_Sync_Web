import { Injectable, signal, computed } from '@angular/core';
import { TranspoModel } from '../../shared/models/transpo-model';

export interface TransportRoute extends TranspoModel {
    id: string;
    routeName: string;
    origin: string;
    destination: string;
    distance: number;
    estimatedTime: string;
    driverId: string;
    vehicleId: string;
}

@Injectable({ providedIn: 'root' })
export class TransportService {
    private readonly _routes = signal<TransportRoute[]>([]);
    private readonly _loading = signal<boolean>(false);

    public readonly routes = this._routes.asReadonly();
    public readonly loading = this._loading.asReadonly();
    public readonly activeRoutes = computed(() =>
        this._routes().filter(r => r.status === 'active')
    );
    public readonly totalRoutes = computed(() => this._routes().length);

    constructor() {
        this._loadMockData();
    }

    private _loadMockData(): void {
        this._routes.set([
            {
                id: '1', routeName: 'Route Alpha', origin: 'Manila', destination: 'Cebu',
                distance: 580, estimatedTime: '8h 30m', driverId: 'D001', vehicleId: 'V001',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'active', comments: null, flag: false
            },
            {
                id: '2', routeName: 'Route Beta', origin: 'Davao', destination: 'Cagayan',
                distance: 210, estimatedTime: '3h 15m', driverId: 'D002', vehicleId: 'V002',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'pending', comments: null, flag: false
            },
            {
                id: '3', routeName: 'Route Gamma', origin: 'Iloilo', destination: 'Bacolod',
                distance: 85, estimatedTime: '1h 45m', driverId: 'D003', vehicleId: 'V003',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'express', status: 'active', comments: null, flag: false
            },
            {
                id: '4', routeName: 'Route Delta', origin: 'Zamboanga', destination: 'Cotabato',
                distance: 320, estimatedTime: '5h 00m', driverId: 'D004', vehicleId: 'V004',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'standard', status: 'completed', comments: null, flag: false
            },
            {
                id: '5', routeName: 'Route Epsilon', origin: 'Baguio', destination: 'La Union',
                distance: 60, estimatedTime: '1h 10m', driverId: 'D005', vehicleId: 'V005',
                createdAt: new Date(), updatedAt: new Date(), createdBy: 'admin', updatedBy: 'admin',
                processFlow: 'express', status: 'active', comments: null, flag: false
            },
        ]);
    }
}
