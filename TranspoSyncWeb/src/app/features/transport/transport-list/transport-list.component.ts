import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransportService, TransportRoute } from '../../../core/services/transport.service';
import { StatusBadgePipe } from '../../../shared/pipes/status-badge.pipe';

@Component({
    selector: 'app-transport-list',
    standalone: true,
    imports: [CommonModule, FormsModule, DatePipe, StatusBadgePipe],
    templateUrl: './transport-list.component.html',
    styleUrl: './transport-list.component.scss'
})
export class TransportListComponent implements OnInit {
    private readonly transportService = inject(TransportService);

    public readonly routes = this.transportService.routes;
    public readonly loading = this.transportService.loading;

    public searchTerm = signal<string>('');
    public selectedStatus = signal<string>('');

    public readonly inTransitCount = computed(() =>
        this.routes().filter(r => (r.status ?? '').toLowerCase() === 'in-transit').length
    );

    public readonly activeCount = computed(() =>
        this.routes().filter(r => (r.status ?? '').toLowerCase() === 'active').length
    );

    public readonly filteredRoutes = computed(() => {
        const term = this.searchTerm().toLowerCase();
        const status = this.selectedStatus().toLowerCase();
        return this.routes().filter(r => {
            const matchesTerm = !term ||
                r.routeName.toLowerCase().includes(term) ||
                r.origin.toLowerCase().includes(term) ||
                r.destination.toLowerCase().includes(term) ||
                r.id.toLowerCase().includes(term);
            const matchesStatus = !status || (r.status ?? '').toLowerCase() === status;
            return matchesTerm && matchesStatus;
        });
    });

    ngOnInit(): void {}

    setSearchTerm(value: string): void {
        this.searchTerm.set(value);
    }

    setStatusFilter(value: string): void {
        this.selectedStatus.set(value);
    }

    trackById(_index: number, route: TransportRoute): string {
        return route.id;
    }
}
