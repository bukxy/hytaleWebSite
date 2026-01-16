import { DashboardContent } from '@/components/dashboard/dashboard-content';
import { AppHeader } from '@/components/app-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <DashboardShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <DashboardContent>{children}</DashboardContent>
        </DashboardShell>
    );
}
