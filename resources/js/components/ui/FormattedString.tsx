export default function FormattedString({
    data,
    date,
    hms
}: {
    data?: string | null,
    date?: boolean,
    hms?: boolean
}) {

    if (!data || data === 'null') return <span>-</span>;

    if (date) {
        const d = new Date(data);

        if (isNaN(d.getTime())) return <span>Invalid date</span>;

        let formatted: string;

        if (hms) {
            const pad = (n: number) => n.toString().padStart(2, "0");

            const YYYY = d.getFullYear();
            const MM = pad(d.getMonth() + 1);
            const DD = pad(d.getDate());

            const hh = pad(d.getHours());
            const mm = pad(d.getMinutes());
            const ss = pad(d.getSeconds());

            formatted = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
        } else
            formatted = d.toISOString().slice(0, 10);

        return <span>{formatted}</span>;
    }

    return <span>{data}</span>;
}
