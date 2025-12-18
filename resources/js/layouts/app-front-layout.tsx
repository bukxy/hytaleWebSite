import AppFrontSidebarLayout from '@/layouts/app/app-front-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppFrontSidebarLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppFrontSidebarLayout>
);
