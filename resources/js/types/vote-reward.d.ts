import { Audit, UploadedFile } from '@/types/index';

export interface VoteRewardForm {
    name: string;
    chances: number;
    money?: number;
    is_enabled: boolean;
    is_online_required: boolean;
    commands?: string;
    image?: File | null;
}

export interface VoteReward {
    id?: number;
    name: string;
    chances: number;
    money: number;
    is_enabled: boolean;
    is_online_required: boolean;
    commands?: string;
    image?: UploadedFile | null;
    created: Audit;
    updated: Audit | null;
}
