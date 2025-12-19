import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Table } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import vote from '@/routes/dashboard/vote';
import voteWebsite from '@/routes/dashboard/vote-website';
import { BreadcrumbItem, TableColumn } from '@/types';
import { Form, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { VoteWebsite, VoteWebsiteForm } from '@/types/vote-website';
import {Trash} from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vote',
        href: vote.list().url,
    },
    {
        title: 'New vote website',
        href: voteWebsite.add().url,
    },
];

const columnsVoteWebsite: TableColumn<VoteWebsite>[] = [
    { key: 'id', label: 'ID', width: 'w-10' },
    { key: 'name', label: 'Name', width: 'w-56' },
    { key: 'url', label: 'Url', width: 'w-56' },
    {
        key: 'created_at',
        label: 'Created at',
        width: 'w-32',
        type: 'date',
        hms: true,
    },
    { key: 'created_by', label: 'Created by', width: 'w-32' },
    {
        key: 'updated_at',
        label: 'Updated at',
        width: 'w-32',
        type: 'date',
        hms: true,
    },
    { key: 'updated_by', label: 'Updated by', width: 'w-32' },
    { key: 'is_enabled', label: 'Is active', width: 'w-10', type: 'boolean' },
    {
        key: 'has_verification',
        label: 'Has verification',
        width: 'w-10',
        type: 'boolean',
    },
];

export default function Vote({ data, votes_websites }: { data: VoteWebsite | null; votes_websites: VoteWebsite[] }) {

    const initData = (data?: VoteWebsite): VoteWebsiteForm => ({
        name: data?.name ?? '',
        url: data?.url ?? '',
        is_enabled: data?.is_enabled ?? false,
        has_verification: data?.has_verification ?? false,
        verification_key: data?.verification_key ?? '',
        logo: null,
    });

    const [formData, setFormData] = useState<VoteWebsiteForm>(() => initData(data ?? undefined));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files && files[0] : value,
        }));
    };

    const voteWebsiteId = data?.id;

    const formConfig =
        voteWebsiteId !== undefined ? voteWebsite.editStore.form({ id: voteWebsiteId }) : voteWebsite.addStore.form();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[1].title} />

            <div>
                <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <Heading title={breadcrumbs[1].title} />
                    <div className="flex w-full flex-col gap-6 lg:flex-row">
                        <Form
                            {...formConfig}
                            resetOnSuccess={false}
                            onSuccess={() => {
                                if (!voteWebsiteId) {
                                    setFormData({
                                        name: '',
                                        url: '',
                                        is_enabled: false,
                                        has_verification: false,
                                        verification_key: '',
                                        logo: null,
                                    });
                                }
                            }}
                            className="lg:min-w-125"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="mb-3 grid gap-2">
                                        <Label htmlFor="name">Website name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            placeholder="votewebsitename.com"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="mb-3 grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="url">Url</Label>
                                        </div>
                                        <Input
                                            id="url"
                                            type="text"
                                            name="url"
                                            value={formData.url}
                                            onChange={handleChange}
                                            required
                                            tabIndex={2}
                                            autoComplete="url"
                                            placeholder="https://votewebsitename.com"
                                        />
                                        <InputError message={errors.url} />
                                    </div>

                                    <div className="col-span-2 col-start-3 grid grid-cols-2 gap-2">
                                        <div className="col-span-1 text-center">
                                            <div>
                                                <Label htmlFor="enable">Active</Label>
                                            </div>
                                            <Checkbox
                                                id="enable"
                                                checked={formData.is_enabled}
                                                tabIndex={3}
                                                onCheckedChange={(v) => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        is_enabled: v === true,
                                                    }));
                                                }}
                                            />
                                            <input
                                                type="hidden"
                                                name="is_enabled"
                                                value={formData.is_enabled ? '1' : '0'}
                                            />
                                            <InputError message={errors.enable} />
                                        </div>

                                        <div className="col-span-1 text-center">
                                            <div>
                                                <Label htmlFor="verification">Verification</Label>
                                            </div>
                                            <Checkbox
                                                id="verification"
                                                checked={formData.has_verification}
                                                tabIndex={4}
                                                onCheckedChange={(v) => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        has_verification: v == true,
                                                    }));
                                                }}
                                            />
                                            <input
                                                type="hidden"
                                                name="has_verification"
                                                value={formData.has_verification ? '1' : '0'}
                                            />
                                            <InputError message={errors.verification} />
                                        </div>
                                    </div>

                                    {Boolean(formData.has_verification) && (
                                        <div className="col-span-2 col-start-3 mb-3 grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="verification_key">Verification Key</Label>
                                            </div>
                                            <Input
                                                id="verification_key"
                                                type="text"
                                                name="verification_key"
                                                value={formData.verification_key ?? ''}
                                                onChange={handleChange}
                                                required
                                                tabIndex={5}
                                                autoComplete="verification_key"
                                                placeholder="toKen12345"
                                            />
                                            <InputError message={errors.verification_key} />
                                        </div>
                                    )}

                                    <div className="col-span-2 col-start-3 grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="logo">Logo</Label>
                                        </div>
                                        <Input
                                            id="logo"
                                            type="file"
                                            name="logo"
                                            onChange={handleChange}
                                            accept="image/*"
                                            tabIndex={6}
                                            autoComplete="logo"
                                        />
                                        <InputError message={errors.logo} />
                                        {data?.logo && voteWebsiteId && (
                                            <div className="grid w-full grid-cols-2 items-center justify-center">
                                                <div className="me-5 flex justify-center">
                                                    <span className={`me-5`}>Actual logo :</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (confirm('Are you sure to delete the logo ?')) {
                                                                router.delete(
                                                                    voteWebsite.deleteLogo(voteWebsiteId).url,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <Trash className="cursor-pointer text-destructive" />
                                                    </button>
                                                </div>
                                                <img
                                                    alt={String(data.logo.path)}
                                                    src={String(data.logo.path)}
                                                    className={'m-auto h-16 w-16 rounded-full'}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-4 w-full transform gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:scale-105 hover:bg-primary/80 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="create-vote-website-button"
                                    >
                                        {processing && <Spinner />}
                                        {voteWebsiteId ? 'S A V E' : 'C R E A T E'}
                                    </Button>
                                </>
                            )}
                        </Form>

                        <Separator className="lg:hidden" />

                        <div className="overflow-hidden">
                            <Table data={votes_websites} columns={columnsVoteWebsite} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
