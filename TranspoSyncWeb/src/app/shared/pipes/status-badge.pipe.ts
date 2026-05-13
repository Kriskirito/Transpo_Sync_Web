import { Pipe, PipeTransform } from '@angular/core';

export interface BadgeConfig {
    label: string;
    classes: string;
}

@Pipe({ name: 'statusBadge', standalone: true })
export class StatusBadgePipe implements PipeTransform {
    transform(status: string | null): BadgeConfig {
        const map: Record<string, BadgeConfig> = {
            active: { label: 'Active', classes: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' },
            pending: { label: 'Pending', classes: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' },
            'in-transit': { label: 'In Transit', classes: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' },
            delivered: { label: 'Delivered', classes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' },
            completed: { label: 'Completed', classes: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
            failed: { label: 'Failed', classes: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
            maintenance: { label: 'Maintenance', classes: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' },
        };
        const key = status?.toLowerCase() ?? '';
        return map[key] ?? { label: status ?? '', classes: 'bg-gray-100 text-gray-600' };
    }
}
