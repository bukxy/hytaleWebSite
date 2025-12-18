import { UploadedFile, UserShort } from '@/types/index';

export interface VoteWebsiteForm {
    name: string;
    url: string;
    is_enabled: boolean;
    has_verification: boolean;
    verification_key: string | null;
    logo: File | null; // ✅ upload
}

export interface VoteWebsite {
    id?: number;
    name: string;
    url: string;
    created_at?: string;
    created_by?: UserShort | null;
    updated_at?: string;
    updated_by?: UserShort | null;
    is_enabled: boolean;
    has_verification: boolean;
    verification_key?: string;
    logo?: UploadedFile | null;
}
