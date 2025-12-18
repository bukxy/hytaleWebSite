import { NavMain } from '@/components/front/nav-main';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { home, shop, stats, vote, wiki } from '@/routes';
import { type NavItem } from '@/types';
import { BookOpenText, ChartNoAxesCombined, House, Store, Vote } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Accueil',
        href: home(),
        icon: House,
    },
    {
        title: 'Vote',
        href: vote(),
        icon: Vote,
    },
    {
        title: 'Stats',
        href: stats(),
        icon: ChartNoAxesCombined,
    },
    {
        title: 'Wiki',
        href: wiki(),
        icon: BookOpenText,
    },
    {
        title: 'Boutique',
        href: shop(),
        icon: Store,
    },
];

export function FrontSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" isFrontNav>
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
