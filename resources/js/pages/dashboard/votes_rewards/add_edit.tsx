import { Table } from '@/components/table';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem, Resource, ResourceCollection, TableColumn } from '@/types';
import { Form, Head, router } from '@inertiajs/react';
import { VoteReward, VoteRewardForm } from '@/types/vote-reward';
import voteReward from "@/routes/dashboard/vote-reward";
import {useState} from "react";
import Heading from "@/components/heading";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import InputError from "@/components/input-error";
import {Checkbox} from "@/components/ui/checkbox";
import {Trash} from "lucide-react";
import {Spinner} from "@/components/ui/spinner";
import {Separator} from "@/components/ui/separator";

const columns: TableColumn<VoteReward>[] = [
    { key: 'id', label: 'ID', width: 'w-10' },
    { key: 'name', label: 'Name', width: 'w-56' },
    { key: 'image', label: 'Image', width: 'w-56', type: 'image' },
    { key: 'chances', label: 'Chance', width: 'w-56' },
    { key: 'money', label: 'Money', width: 'w-32' },
    { key: 'commands', label: 'Command', width: 'w-32' },
    { key: 'created', label: 'Creator', width: 'w-32', type: 'user' },
    { key: 'updated', label: 'Editor', width: 'w-32', type: 'user' },
    { key: 'is_enabled', label: 'Is active', width: 'w-10', type: 'boolean' },
    { key: 'is_online_required', label: 'Online required', width: 'w-10', type: 'boolean' },
];

export default function VoteRewardList({
    data,
    rewards,
}: {
    data: Resource<VoteReward> | null;
    rewards: ResourceCollection<VoteReward>;
}) {

    const item = data?.data ?? null;
    const itemId = item?.id;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: item ? `Edit vote reward` : 'New vote Reward',
            href: voteReward.add().url,
        },
    ];

    const initData = (item?: VoteReward): VoteRewardForm => ({
        name: item?.name ?? '',
        chances: item?.chances ?? 0,
        money: item?.money ?? null,
        is_enabled: item?.is_enabled ?? false,
        is_online_required: item?.is_online_required ?? false,
        commands: item?.commands ?? null,
        image: null,
    });

    const [formData, setFormData] = useState<VoteRewardForm>(() => initData(item ?? undefined));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files && files[0] : value,
        }));
    };

    const formConfig = itemId != null ? voteReward.editStore.form({ id: itemId }) : voteReward.addStore.form();

    return (
        <>
            <Head title={breadcrumbs[0].title} />

            <div>
                <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <Heading title={item ? `${breadcrumbs[0].title} : ${item?.name}` : breadcrumbs[0].title} />
                    <div className="flex w-full flex-col gap-6 lg:flex-row">
                        <Form
                            {...formConfig}
                            resetOnSuccess={false}
                            onSuccess={() => {
                                if (!item) {
                                    setFormData({
                                        name: '',
                                        chances: 0,
                                        money: null,
                                        is_enabled: false,
                                        is_online_required: false,
                                        image: null,
                                        commands: '',
                                    });
                                }
                            }}
                            className="lg:min-w-125"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="mb-3 grid gap-2">
                                        <Label htmlFor="name">Reward name</Label>
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
                                            <Label htmlFor="chances">Chances</Label>
                                        </div>
                                        <Input
                                            id="chances"
                                            type="number"
                                            name="chances"
                                            value={formData.chances}
                                            onChange={handleChange}
                                            required
                                            tabIndex={2}
                                            autoComplete="chances"
                                            placeholder="20"
                                        />
                                        <InputError message={errors.chances} />
                                    </div>

                                    <div className="mb-3 grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="money">Money</Label>
                                        </div>
                                        <Input
                                            id="money"
                                            type="number"
                                            name="money"
                                            value={formData.money ?? ''}
                                            onChange={handleChange}
                                            tabIndex={3}
                                            autoComplete="money"
                                            placeholder="0"
                                        />
                                        <InputError message={errors.money} />
                                    </div>

                                    <div className="mb-3 grid gap-2">
                                        <Label htmlFor="commands">Commands</Label>
                                        <Input
                                            id="commands"
                                            type="text"
                                            name="commands"
                                            value={formData.commands ?? ''}
                                            onChange={handleChange}
                                            autoFocus
                                            tabIndex={4}
                                            autoComplete="commands"
                                            placeholder="give {player} grass 1"
                                        />
                                        <InputError message={errors.commands} />
                                    </div>

                                    <div className="col-span-2 col-start-3 grid grid-cols-2 gap-2">
                                        <div className="col-span-1 text-center">
                                            <div>
                                                <Label htmlFor="enable">Active</Label>
                                            </div>
                                            <Checkbox
                                                id="enable"
                                                checked={formData.is_enabled}
                                                tabIndex={5}
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
                                            <InputError message={errors.is_enabled} />
                                        </div>

                                        <div className="col-span-1 text-center">
                                            <div>
                                                <Label htmlFor="is_online_required">Player online required</Label>
                                            </div>
                                            <Checkbox
                                                id="is_online_required"
                                                checked={formData.is_online_required}
                                                tabIndex={6}
                                                onCheckedChange={(v) => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        is_online_required: v == true,
                                                    }));
                                                }}
                                            />
                                            <input
                                                type="hidden"
                                                name="is_online_required"
                                                value={formData.is_online_required ? '1' : '0'}
                                            />
                                            <InputError message={errors.is_online_required} />
                                        </div>
                                    </div>

                                    <div className="col-span-2 col-start-3 grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="image">Image</Label>
                                        </div>
                                        <Input
                                            id="image"
                                            type="file"
                                            name="image"
                                            onChange={handleChange}
                                            accept="image/*"
                                            tabIndex={7}
                                            autoComplete="image"
                                        />
                                        <InputError message={errors.image} />
                                        {itemId != null && item?.image && (
                                            <div className="grid w-full grid-cols-2 items-center justify-center">
                                                <div className="me-5 flex justify-center">
                                                    <span className={`me-5`}>Actual image :</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (confirm('Are you sure to delete the image ?')) {
                                                                router.delete(voteReward.deleteImage(itemId).url);
                                                            }
                                                        }}
                                                    >
                                                        <Trash className="cursor-pointer text-destructive" />
                                                    </button>
                                                </div>
                                                <img
                                                    alt={String(item.image.path)}
                                                    src={String(item.image.path)}
                                                    className={'m-auto h-16 w-16 rounded-full'}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-4 w-full transform gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:scale-105 hover:bg-primary/80 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                        tabIndex={8}
                                        disabled={processing}
                                        item-test="create-vote-website-button"
                                    >
                                        {processing && <Spinner />}
                                        {item ? 'S A V E' : 'C R E A T E'}
                                    </Button>
                                    <InputError message={errors.voteReward} />
                                </>
                            )}
                        </Form>

                        <Separator className="lg:hidden" />

                        <div className="overflow-hidden">
                            <Table
                                data={rewards.data}
                                columns={columns}
                                config={{
                                    editUrl: voteReward.edit.definition.url,
                                    deleteUrl: voteReward.delete.definition.url,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
