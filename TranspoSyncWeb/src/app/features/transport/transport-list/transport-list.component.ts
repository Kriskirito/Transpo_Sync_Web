import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransportService, TransportRoute } from '../../../core/services/transport.service';
import { StatusBadgePipe } from '../../../shared/pipes/status-badge.pipe';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-transport-list',
    standalone: true,
    imports: [CommonModule, FormsModule, StatusBadgePipe, AnimateOnScrollDirective],
    templateUrl: './transport-list.component.html',
    styleUrl: './transport-list.component.scss'
})
export class TransportListComponent implements OnInit {
    private readonly transportService = inject(TransportService);

    public readonly routes = this.transportService.routes;
    public readonly loading = this.transportService.loading;
    public searchTerm = signal<string>('');

    public get filteredRoutes(): TransportRoute[] {
        const term = this.searchTerm().toLowerCase();
        if (!term) return this.routes();
        return this.routes().filter(r =>
            r.routeName.toLowerCase().includes(term) ||
            r.origin.toLowerCase().includes(term) ||
            r.destination.toLowerCase().includes(term)
        );
    }

    ngOnInit(): void {}

    onSearch(event: Event): void {
        this.searchTerm.set((event.target as HTMLInputElement).value);
    }

    trackById(_index: number, route: TransportRoute): string {
        return route.id;
    }
}
