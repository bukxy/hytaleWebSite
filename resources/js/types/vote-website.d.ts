import { Audit, UploadedFile } from '@/types/index';

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
    created: Audit;
    updated: Audit | null;
    is_enabled: boolean;
    has_verification: boolean;
    verification_key?: string;
    logo?: UploadedFile | null;
}
