import { TableColumn } from '@/types';

interface TableProps<T extends object> {
    data?: T[];
    columns?: TableColumn<T>[];
}

export function Table<T extends object>({ data = [], columns = [] }: TableProps<T>) {
    return (
        <>
            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-white px-12 py-4 align-middle shadow-lg">
                    <div className="flex justify-between">
                        <div className="inline-flex h-12 w-7/12 rounded border bg-transparent px-2 lg:px-6">
                            <div className="relative mb-6 flex h-full w-full flex-wrap items-stretch">
                                <div className="flex">
                                    <span className="whitespace-no-wrap text-grey-dark flex items-center rounded rounded-r-none border border-r-0 border-none bg-transparent py-2 text-sm leading-normal lg:px-3">
                  <svg
                      width="18"
                      height="18"
                      className="w-4 lg:w-auto"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                        stroke="#455A64"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16.9993 16.9993L13.1328 13.1328"
                        stroke="#455A64"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                  </svg>
                </span>
                                </div>
                                <input
                                    type="text"
                                    className="text-xxs relative w-px flex-shrink flex-grow rounded rounded-l-none border border-l-0 border-none px-3 leading-normal font-thin tracking-wide text-gray-500 focus:outline-none"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shadow-dashboard inline-block w-full rounded-br-lg rounded-bl-lg bg-white px-8 pt-3 align-middle shadow">
                    <div className="overflow-x-auto overflow-y-auto max-h-96">
                        <table className="min-w-full">
                            <thead className="sticky top-0 bg-white z-10">
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.key.toString()}
                                        className="border-b-2 border-gray-300 px-6 py-3 text-left leading-4 tracking-wider text-blue-500 whitespace-nowrap"
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
                                            className="border-b border-gray-500 px-6 py-4 text-sm leading-5 text-blue-900 whitespace-nowrap"
                                        >
                                            {String((row as any)[col.key])}
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
