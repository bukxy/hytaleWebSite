import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn, resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

function SidebarCollapsibleItem({ item }: { item: NavItem }) {
    const page = usePage();
    const { openMenus, toggleMenu } = useSidebar();
    const hasSub = !!item.items;

    const isSubActive = hasSub && item.items!.some((sub) => sub.href && page.url === resolveUrl(sub.href.toString()));

    const isOpen = openMenus[item.title] ?? isSubActive;

    const handleClick = (e: React.MouseEvent) => {
        if (hasSub) {
            e.preventDefault();
            toggleMenu(item.title);
        }
    };

    const isActive = !!item.href && page.url === resolveUrl(item.href);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: item.title }} onClick={handleClick}>
                {hasSub ? (
                    <div className="flex items-center gap-2">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight
                            className={cn('ml-auto transition-transform duration-200', isOpen && 'rotate-90')}
                        />
                    </div>
                ) : (
                    <Link href={item.href!} className="flex items-center gap-2">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </Link>
                )}
            </SidebarMenuButton>

            {hasSub && isOpen && (
                <SidebarMenuSub>
                    {item.items!.map((sub) => (
                        <SidebarMenuSubItem key={sub.href?.toString() ?? sub.title}>
                            <SidebarMenuSubButton
                                href={sub.href?.toString()}
                                isActive={!!sub.href && page.url === resolveUrl(sub.href.toString())}
                            >
                                {item.icon && <item.icon />}
                                {sub.title}
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            )}
        </SidebarMenuItem>
    );
}

export function NavMain({ items = [] }: { items: NavItem[] }) {
    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarCollapsibleItem key={item.title} item={item} />
            ))}
        </SidebarMenu>
    );
}
