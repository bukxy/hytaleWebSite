import  { BreadcrumbItem, TableColumn, VoteWebsite } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Form, Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { vwAdd, vwAddStore } from '@/routes/dashboard/vote-website';
import { vVote } from '@/routes/dashboard';
import { Table } from '@/components/table';
import { useState } from 'react';
import Heading from '@/components/heading';
import { SeparatorVertical } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vote',
        href: vVote().url,
    },
    {
        title: 'New vote website',
        href: vwAdd().url,
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

export default function Vote({ votes_websites } : { votes_websites: VoteWebsite[] }) {

    const [formData, setFormData] = useState<{
        name: string;
        url: string;
        is_enabled: boolean;
        has_verification: boolean;
        verification_key: string;
        logo: File | null;
    }>({
        name: '',
        url: '',
        is_enabled: false,
        has_verification: false,
        verification_key: '',
        logo: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                    : type === 'file'
                      ? files && files[0]
                      : value,
        }));
    };

    const [verification, setVerification] = useState(false);
    const [enable, setEnable] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[1].title} />

            <div>
                <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <Heading title={breadcrumbs[1].title} />
                    <div className="flex w-full flex-col lg:flex-row gap-6">
                        <Form
                            {...vwAddStore.form()}
                            resetOnSuccess={false}
                            onSuccess={() => {
                                setFormData({
                                    name: '',
                                    url: '',
                                    is_enabled: false,
                                    has_verification: false,
                                    verification_key: '',
                                    logo: null,
                                });
                                setEnable(false);
                                setVerification(false);
                            }}
                            className="lg:min-w-125"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="mb-3 grid gap-2">
                                        <Label htmlFor="name">
                                            Website name
                                        </Label>
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
                                                <Label htmlFor="enable">
                                                    Active
                                                </Label>
                                            </div>
                                            <Checkbox
                                                id="enable"
                                                name="is_enabled"
                                                checked={enable}
                                                tabIndex={3}
                                                onCheckedChange={(v) => {
                                                    setEnable(!!v);
                                                    setFormData({
                                                        ...formData,
                                                        is_enabled: !!v,
                                                    });
                                                }}
                                            />
                                            <InputError
                                                message={errors.enable}
                                            />
                                        </div>

                                        <div className="col-span-1 text-center">
                                            <div>
                                                <Label htmlFor="verification">
                                                    Verification
                                                </Label>
                                            </div>
                                            <Checkbox
                                                id="verification"
                                                name="has_verification"
                                                checked={verification}
                                                tabIndex={4}
                                                onCheckedChange={(v) => {
                                                    setVerification(!!v);
                                                    setFormData({
                                                        ...formData,
                                                        has_verification: !!v,
                                                    });
                                                }}
                                            />
                                            <InputError
                                                message={errors.verification}
                                            />
                                        </div>
                                    </div>

                                    {verification && (
                                        <div className="col-span-2 col-start-3 mb-3 grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="verification_key">
                                                    Verification Key
                                                </Label>
                                            </div>
                                            <Input
                                                id="verification_key"
                                                type="text"
                                                name="verification_key"
                                                value={
                                                    formData.verification_key
                                                }
                                                onChange={handleChange}
                                                required
                                                tabIndex={5}
                                                autoComplete="verification_key"
                                                placeholder="toKen12345"
                                            />
                                            <InputError
                                                message={
                                                    errors.verification_key
                                                }
                                            />
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
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-4 w-full transform gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:scale-105 hover:bg-primary/80 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="create-vote-website-button"
                                    >
                                        {processing && <Spinner />}
                                        CREATE
                                    </Button>
                                </>
                            )}
                        </Form>

                        <Separator className="lg:hidden"/>

                        <div className="overflow-hidden">
                            <Table
                                data={votes_websites}
                                columns={columnsVoteWebsite}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
