import { FrontContent } from '@/components/front/front-content';
import { FrontShell } from '@/components/front/front-shell';
import { FrontSidebarHeader } from '@/components/front/front-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { FrontSidebar } from '@/components/front/front-sidebar';

export default function AppFrontSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <FrontShell variant="sidebar">
            <FrontSidebar />
            <FrontContent variant="sidebar" className="overflow-x-hidden">
                <FrontSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </FrontContent>
        </FrontShell>
    );
}
