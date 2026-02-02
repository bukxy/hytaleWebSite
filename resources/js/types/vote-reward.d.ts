import { Audit, UploadedFile } from '@/types/index';

export interface VoteRewardForm {
    name: string;
    chances: number;
    money: number | null;
    is_enabled: boolean;
    is_online_required: boolean;
    commands: string | null;
    image: File | null;
}

export interface VoteReward {
    id?: number;
    name: string;
    chances: number;
    money: number | null;
    is_enabled: boolean;
    is_online_required: boolean;
    commands: string | null;
    image: UploadedFile | null;
    created: Audit;
    updated: Audit | null;
}
