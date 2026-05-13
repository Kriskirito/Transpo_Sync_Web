import {
    Component, OnInit, OnDestroy, AfterViewInit,
    ViewChild, ElementRef, inject, computed
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ShipmentService } from '../../core/services/shipment.service';
import { VehicleService } from '../../core/services/vehicle.service';
import { GsapAnimationService } from '../../animations/gsap/gsap-animation.service';
import { ThreeSceneService } from '../../animations/three/three-scene.service';
import { StatusBadgePipe } from '../../shared/pipes/status-badge.pipe';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, StatusBadgePipe, AnimateOnScrollDirective, DatePipe],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('threeCanvas') threeCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('statShipments') statShipments!: ElementRef<HTMLElement>;
    @ViewChild('statVehicles') statVehicles!: ElementRef<HTMLElement>;
    @ViewChild('statRoutes') statRoutes!: ElementRef<HTMLElement>;
    @ViewChild('statInventory') statInventory!: ElementRef<HTMLElement>;

    private readonly analyticsService = inject(AnalyticsService);
    private readonly shipmentService = inject(ShipmentService);
    private readonly vehicleService = inject(VehicleService);
    private readonly gsapService = inject(GsapAnimationService);
    private readonly threeService = inject(ThreeSceneService);

    public readonly totalShipments = this.analyticsService.totalShipments;
    public readonly activeVehicles = this.analyticsService.activeVehicles;
    public readonly activeRoutes = this.analyticsService.activeRoutes;
    public readonly totalInventory = this.analyticsService.totalInventoryItems;
    public readonly deliveryRate = this.analyticsService.deliveryRate;
    public readonly inTransitCount = this.analyticsService.inTransitCount;
    public readonly pendingCount = this.analyticsService.pendingCount;

    public readonly recentShipments = computed(() =>
        this.shipmentService.shipments().slice(0, 5)
    );
    public readonly vehicleList = computed(() =>
        this.vehicleService.vehicles().slice(0, 4)
    );

    public readonly today = new Date();

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.threeService.initScene(this.threeCanvas.nativeElement);

        setTimeout(() => {
            this.gsapService.animateCountUp(this.statShipments.nativeElement, this.totalShipments());
            this.gsapService.animateCountUp(this.statVehicles.nativeElement, this.activeVehicles());
            this.gsapService.animateCountUp(this.statRoutes.nativeElement, this.activeRoutes());
            this.gsapService.animateCountUp(this.statInventory.nativeElement, this.totalInventory());

            const cards = document.querySelectorAll('.stat-card');
            this.gsapService.staggerIn(cards, 0.1);

            const tableEl = document.querySelector('.shipment-table');
            if (tableEl) {
                this.gsapService.fadeInUp(tableEl as HTMLElement, 0.4);
            }
        }, 120);
    }

    ngOnDestroy(): void {
        this.threeService.destroyScene();
    }
}
