import { Injectable, computed, inject } from '@angular/core';
import { ShipmentService } from './shipment.service';
import { VehicleService } from './vehicle.service';
import { InventoryService } from './inventory.service';
import { TransportService } from './transport.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
    private readonly shipmentService = inject(ShipmentService);
    private readonly vehicleService = inject(VehicleService);
    private readonly inventoryService = inject(InventoryService);
    private readonly transportService = inject(TransportService);

    public readonly totalShipments = computed(() =>
        this.shipmentService.totalShipments()
    );

    public readonly activeVehicles = computed(() =>
        this.vehicleService.activeVehicles().length
    );

    public readonly totalInventoryItems = computed(() =>
        this.inventoryService.totalItems()
    );

    public readonly activeRoutes = computed(() =>
        this.transportService.activeRoutes().length
    );

    public readonly deliveryRate = computed(() => {
        const total = this.shipmentService.totalShipments();
        const delivered = this.shipmentService.deliveredShipments().length;
        return total > 0 ? Math.round((delivered / total) * 100) : 0;
    });

    public readonly inTransitCount = computed(() =>
        this.shipmentService.inTransitShipments().length
    );

    public readonly pendingCount = computed(() =>
        this.shipmentService.pendingShipments().length
    );
}
