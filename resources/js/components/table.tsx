import { TableColumn } from '@/types';
import { CheckCircle, Pencil, Trash, XCircle } from 'lucide-react';
import FormattedString from '@/components/ui/FormattedString';
import {InertiaLinkProps, Link} from "@inertiajs/react";

interface TableProps<T extends object> {
    data?: T[];
    columns?: TableColumn<T>[];
    config?: {
        editUrl?: NonNullable<InertiaLinkProps['href']>;
        deleteUrl?: NonNullable<InertiaLinkProps['href']>;
    };
}

export function Table<T extends object>({
                                            data = [],
                                            columns = [],
                                            config
}: TableProps<T>) {

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
                                            {(config?.deleteUrl ||
                                                config?.editUrl) && (
                                                <td
                                                    key="edit"
                                                    className="border-b border-gray-500 px-6 py-4 text-center text-sm leading-5 whitespace-nowrap text-blue-900"
                                                >
                                                    <div className="flex justify-center gap-4">
                                                        {config?.editUrl && (
                                                            <Link
                                                                href={
                                                                    `${config.editUrl}/${keyValue}`
                                                                }
                                                            >
                                                                <Pencil className="text-success" />
                                                            </Link>
                                                        )}
                                                        {config?.deleteUrl && (
                                                            <Link
                                                                href={
                                                                    `${config.deleteUrl}/${keyValue}`
                                                                }
                                                            >
                                                                <Trash className="text-destructive" />
                                                            </Link>
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
                                                            data={String(
                                                                row[col.key],
                                                            )}
                                                            hms={!!col.hms}
                                                            date
                                                        />
                                                    ) : col.type ===
                                                      'boolean' ? (
                                                        <div className="flex w-full items-center justify-center">
                                                            {row[col.key] ? (
                                                                <CheckCircle
                                                                    className={
                                                                        'text-success'
                                                                    }
                                                                />
                                                            ) : (
                                                                <XCircle
                                                                    className={
                                                                        'text-destructive'
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <FormattedString
                                                            data={String(
                                                                row[col.key],
                                                            )}
                                                        />
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
