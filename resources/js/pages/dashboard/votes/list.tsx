import { BreadcrumbItem, TableColumn, Vote, VoteWebsite } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Table } from '@/components/table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { vVote } from '@/routes/dashboard';
import { vwAdd } from '@/routes/dashboard/vote-website';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vote',
        href: vVote().url,
    },
];

const columnsVote: TableColumn<Vote>[] = [
    {key: 'id', label: 'ID', width: 'w-10'},
    {key: 'voter_name', label: 'Voter Name', width: 'w-56'},
    {key: 'created_at', label: 'Voted At', width: 'w-56'},
    {key: 'website', label: 'Website', width: 'w-56'},
]

const columnsVoteWebsite: TableColumn<VoteWebsite>[] = [
    {key: 'id', label: 'ID', width: 'w-10'},
    {key: 'name', label: 'Name', width: 'w-56'},
    {key: 'url', label: 'Url', width: 'w-56'},
    {key: 'created_at', label: 'Created at', width: 'w-32', type: 'date', hms: true},
    {key: 'created_by', label: 'Created by', width: 'w-32'},
    {key: 'updated_at', label: 'Updated at', width: 'w-32', type: 'date', hms: true},
    {key: 'updated_by', label: 'Updated by', width: 'w-32'},
    {key: 'is_enabled', label: 'Is active', width: 'w-10', type: 'boolean'},
    {key: 'has_verification', label: 'Has verification', width: 'w-10', type: 'boolean'},
]

const data = [
    {
        name: 'Page A',
        uv: 400,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 300,
        pv: 4567,
        amt: 2400,
    },
    {
        name: 'Page C',
        uv: 320,
        pv: 1398,
        amt: 2400,
    },
    {
        name: 'Page D',
        uv: 200,
        pv: 9800,
        amt: 2400,
    },
    {
        name: 'Page E',
        uv: 278,
        pv: 3908,
        amt: 2400,
    },
    {
        name: 'Page F',
        uv: 189,
        pv: 4800,
        amt: 2400,
    },
];

export default function VoteList({
    votes,
    votes_websites,
}: {
    votes: Vote[],
    votes_websites: VoteWebsite[]
}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Vote" />
        <div className="flex h-full flex-1 flex-col rounded-xl">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 p-4 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className={'col-span-2'}>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 mb-2 bg-success hover:bg-success/80"
                        >
                            <Link
                                // key={item.title}
                                href={vwAdd()}
                                className="flex items-center space-x-2 font-medium"
                            >
                                <span>Add vote website</span>
                            </Link>
                        </Button>

                        <Table data={votes_websites} columns={columnsVoteWebsite}/>
                    </div>

                    <AreaChart
                        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                        responsive
                        data={data}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis width="auto" />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <Table data={votes} columns={columnsVote}/>
                </div>
            </div>

            <AreaChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width="auto" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </div>
    </AppLayout>
  )
}
