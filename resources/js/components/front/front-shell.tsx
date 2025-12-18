import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface FrontShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function FrontShell({ children, variant = 'header' }: FrontShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return (
        <SidebarProvider defaultOpen={isOpen} isFrontNav>
            {children}
        </SidebarProvider>
    );
}
