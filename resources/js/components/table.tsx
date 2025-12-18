import FormattedString from '@/components/ui/FormattedString';
import { TableColumn } from '@/types';
import { Link, router } from '@inertiajs/react';
import { CheckCircle, Pencil, Trash, XCircle } from 'lucide-react';

interface TableProps<T extends object> {
    data?: T[];
    columns?: TableColumn<T>[];
    config?: {
        editUrl?: string;
        deleteUrl?: string;
        idKey?: keyof T;
    };
}

export function Table<T extends object>({ data = [], columns = [], config }: TableProps<T>) {
    const configEdit = config?.editUrl;
    const configDelete = config?.deleteUrl;

    return (
        <>
            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="shadow-dashboard inline-block w-full rounded-br-lg rounded-bl-lg bg-white pt-3 align-middle shadow">
                    <div className="max-h-96 overflow-x-auto overflow-y-auto">
                        <table className="min-w-full">
                            <thead className="sticky top-0 z-10 border-b-2 bg-white">
                                <tr>
                                    {config && (
                                        <th
                                            key="edit"
                                            className="border-b-2 border-gray-300 px-6 py-3 text-center leading-4 tracking-wider whitespace-nowrap text-blue-500"
                                        >
                                            Settings
                                        </th>
                                    )}
                                    {columns.map((col) => (
                                        <th
                                            key={col.key.toString()}
                                            className="border-b-2 border-gray-300 px-6 py-3 text-center leading-4 tracking-wider whitespace-nowrap text-blue-500"
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {data.map((row, rowIndex) => {
                                    const keyColumn = columns[0];
                                    const keyValue = row[keyColumn.key]; // stock key

                                    return (
                                        <tr key={rowIndex}>
                                            {(configDelete || configEdit) && (
                                                <td
                                                    key="edit"
                                                    className="border-b border-gray-500 px-6 py-4 text-center text-sm leading-5 whitespace-nowrap text-blue-900"
                                                >
                                                    <div className="flex justify-center gap-4">
                                                        {configEdit && (
                                                            <Link href={configEdit.replace('{id}', String(keyValue))}>
                                                                <Pencil className="text-success" />
                                                            </Link>
                                                        )}
                                                        {configDelete && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (confirm('Are you sure ?')) {
                                                                        router.delete(
                                                                            configDelete.replace(
                                                                                '{id}',
                                                                                String(keyValue),
                                                                            ),
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                <Trash className="cursor-pointer text-destructive" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                            {columns.map((col) => (
                                                <td
                                                    key={col.key.toString()}
                                                    className="border-b border-gray-500 px-6 py-4 text-center text-sm leading-5 whitespace-nowrap text-blue-900"
                                                >
                                                    {col.type === 'date' ? (
                                                        <FormattedString
                                                            data={String(row[col.key])}
                                                            hms={!!col.hms}
                                                            date
                                                        />
                                                    ) : col.type === 'boolean' ? (
                                                        <div className="flex w-full items-center justify-center">
                                                            {row[col.key] ? (
                                                                <CheckCircle className={'text-success'} />
                                                            ) : (
                                                                <XCircle className={'text-destructive'} />
                                                            )}
                                                        </div>
                                                    ) : col.type === 'image' ? (
                                                        <div className="flex w-full items-center justify-center">
                                                            {row[col.key] && (
                                                                <img
                                                                    alt={String(row[col.key])}
                                                                    src={String(row[col.key])}
                                                                    className={'h-8 w-8 rounded-full'}
                                                                />
                                                            )}
                                                        </div>
                                                    ) : col.type === 'link' ? (
                                                        <a
                                                            href={String(row[col.key])}
                                                            target="_blank"
                                                            className={`italic`}
                                                        >
                                                            {String(row[col.key])}
                                                        </a>
                                                    ) : (
                                                        <FormattedString data={String(row[col.key])} />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
