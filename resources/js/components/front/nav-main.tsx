import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="overflow-hidden px-2 py-0">
            <SidebarMenu className="h-dvh items-center justify-center">
                {items.map((item) => {
                    const target = item.href ? resolveUrl(item.href) : '';
                    const isActive = target ? page.url.startsWith(target) : false;
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                                className={'flex flex-col items-center'}
                            >
                                <Link href={item.href} prefetch className="h-20 w-20">
                                    {item.icon && <item.icon className="icon-size-front-vav-menu" />}
                                    <span className="text-2xl">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}