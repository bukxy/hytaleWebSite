import { TableColumn } from '@/types';
import { CheckCircle, XCircle } from 'lucide-react';
import FormattedString from '@/components/ui/FormattedString';

interface TableProps<T extends object> {
    data?: T[];
    columns?: TableColumn<T>[];
}

export function Table<T extends object>({ data = [], columns = [] }: TableProps<T>) {

    // console.log(data);
    return (
        <>
            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="shadow-dashboard inline-block w-full rounded-br-lg rounded-bl-lg bg-white pt-3 align-middle shadow">
                    <div className="overflow-x-auto overflow-y-auto max-h-96">
                        <table className="min-w-full">
                            <thead className="sticky top-0 bg-white z-10 border-b-2">
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.key.toString()}
                                        className="border-b-2 border-gray-300 px-6 py-3 leading-4 tracking-wider text-blue-500 whitespace-nowrap text-center"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                            </thead>

                            <tbody className="bg-white">
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col) => (
                                        <td
                                            key={col.key.toString()}
                                            className="border-b border-gray-500 px-6 py-4 text-sm leading-5 text-blue-900 whitespace-nowrap text-center"
                                        >
                                            {
                                                col.type === 'date' ? (
                                                    <FormattedString data={String(row[col.key])} hms={!!col.hms} date/>
                                                ) : col.type === 'boolean' ? (
                                                    <div className="flex items-center justify-center w-full">
                                                        {row[col.key] ? <CheckCircle className={'text-success'} /> : <XCircle className={'text-destructive'}/>}
                                                    </div>
                                                ) : <FormattedString data={String(row[col.key])}/>
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
