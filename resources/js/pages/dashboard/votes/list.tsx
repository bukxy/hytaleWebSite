import { BreadcrumbItem, TableColumn, Vote } from '@/types';
import { dashboard_vote } from '@/routes';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Table } from '@/components/table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vote',
        href: dashboard_vote().url,
    },
];

const columnsVote: TableColumn<Vote>[] = [
    {key: 'id', label: 'ID', width: 'w-10'},
    {key: 'voter_name', label: 'Voter Name', width:  'w-56'},
    {key: 'created_at', label: 'Voted At', width:  'w-56'},
    {key: 'website', label: 'Website', width:  'w-56'},
]

export default function VoteList({
    votes
}: {
    votes: Vote[]
}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Vote" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="relative aspect-video rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <Table data={votes} columns={columnsVote}/>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <Table data={votes} columns={columnsVote}/>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <Table data={votes} columns={columnsVote}/>
                </div>
            </div>
        </div>
    </AppLayout>
  )
}
