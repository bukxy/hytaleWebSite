import { DashboardContent } from '@/components/dashboard/dashboard-content';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardSidebarHeader } from '@/components/dashboard/dashboard-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <DashboardShell variant="sidebar">
            <DashboardSidebar />
            <DashboardContent variant="sidebar" className="overflow-x-hidden">
                <DashboardSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </DashboardContent>
        </DashboardShell>
    );
}
