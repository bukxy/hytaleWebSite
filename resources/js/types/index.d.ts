import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href?: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface UserShort {
    name: string;
    email: string;
}

export interface Audit {
    at: string;
    by: UserShort | null;
}

export interface Vote {
    id: number;
    voter_name: string;
    created_at: string;
    voter_email?: string;
    website: string;
}

export interface UploadedFile {
    id: number;
    path: string;
}

export interface TableColumn<T> {
    key: keyof T;
    label: string;
    width?: string;
    type?: 'date' | 'number' | 'boolean' | 'image' | 'link' | 'user';
    hms?: boolean; // for date type, whether to show hours, minutes, seconds
    editHref?: NonNullable<InertiaLinkProps['href']>;
}

export interface ResourceCollection<T> {
    data: T[];
}
