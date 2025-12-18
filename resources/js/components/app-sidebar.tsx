import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import dashboard from '@/routes/dashboard';
import vote from '@/routes/dashboard/vote';
import voteReward from '@/routes/dashboard/vote-reward';
import voteWebsite from '@/routes/dashboard/vote-website';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Vote } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        icon: LayoutGrid,
        href: dashboard.home().url,
    },
    {
        title: 'Votes',
        icon: Vote,
        items: [
            {
                title: 'List',
                href: vote.list().url,
                icon: Vote,
            },
            {
                title: 'Create vote website',
                href: voteWebsite.add().url,
                icon: Vote,
            },
            {
                title: 'Create vote reward',
                href: voteReward.add().url,
                icon: Vote,
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard.home().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <NavUser />
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
