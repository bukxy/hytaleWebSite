import { Table } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import vote from '@/routes/dashboard/vote/index';
import voteWebsite from '@/routes/dashboard/vote-website';
import { BreadcrumbItem, TableColumn } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import {VoteWebsite} from "@/types/vote-website";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vote',
        href: vote.list().url,
    },
];

// const columnsVote: TableColumn<Vote>[] = [
//     {key: 'id', label: 'ID', width: 'w-10'},
//     {key: 'voter_name', label: 'Voter Name', width: 'w-56'},
//     {key: 'created_at', label: 'Voted At', width: 'w-56'},
//     {key: 'website', label: 'Website', width: 'w-56'},
// ]

const columnsVoteWebsite: TableColumn<VoteWebsite>[] = [
    { key: 'id', label: 'ID', width: 'w-10' },
    { key: 'name', label: 'Name', width: 'w-56' },
    { key: 'logo', label: 'Logo', width: 'w-56', type: 'image' },
    { key: 'url', label: 'Url', width: 'w-56', type: 'link' },
    { key: 'created_at', label: 'Created at', width: 'w-32', type: 'date', hms: true },
    { key: 'created_by', label: 'Created by', width: 'w-32' },
    { key: 'updated_at', label: 'Updated at', width: 'w-32', type: 'date', hms: true },
    { key: 'updated_by', label: 'Updated by', width: 'w-32' },
    { key: 'is_enabled', label: 'Is active', width: 'w-10', type: 'boolean' },
    { key: 'has_verification', label: 'Has verification', width: 'w-10', type: 'boolean' },
];

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
    // votes,
    votes_websites,
}: {
    // votes: Vote[],
    votes_websites: VoteWebsite[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vote" />
            <Card className="m-4">
                <CardContent>
                    <CardTitle>Vote websites</CardTitle>
                    <CardDescription>Informations about vote websites</CardDescription>
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-primary text-accent hover:bg-primary/80 hover:text-accent"
                    >
                        <Link href={voteWebsite.add().url} className="font-medium">
                            <span>Add vote website</span>
                        </Link>
                    </Button>

                    <div className="flex w-full flex-col gap-2 lg:flex-row">
                        <AreaChart
                            style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '700px',
                                maxHeight: '70vh',
                                aspectRatio: 1.618,
                            }}
                            responsive
                            data={data}
                            margin={{
                                top: 20,
                                right: 0,
                                left: 0,
                                bottom: 0,
                            }}
                            className="md:min-w-[350px]"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis width="auto" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>

                        <div className="overflow-hidden">
                            <Table
                                data={votes_websites}
                                columns={columnsVoteWebsite}
                                config={{
                                    editUrl: voteWebsite.edit.definition.url,
                                    deleteUrl: voteWebsite.delete.definition.url,
                                }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
