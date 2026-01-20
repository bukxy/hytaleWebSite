import AppDashboardSidebarLayout from '@/layouts/app/dashboard/app-dashboard-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import {usePage} from "@inertiajs/react";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppDashboardLayout({ children, ...props }: AppLayoutProps) {
    const { breadcrumbs = [] } = usePage<{ breadcrumbs?: BreadcrumbItem[] }>().props;
    return (
        <AppDashboardSidebarLayout breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppDashboardSidebarLayout>
    );
}
