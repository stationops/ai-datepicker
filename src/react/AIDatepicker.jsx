import { useState } from 'react';
import { fetchDate, tryCatch } from '../core';

export default function AIDatepicker({
                                         placeholder = 'eg: Next Monday',
                                         region,
                                         format,
                                         hint,
                                         onFetching,
                                         onSelected,
                                         onError,
                                         onDone,
                                         initialQuery = '',
                                         initialResult = ''
                                     }) {
    const [query, setQuery] = useState(initialQuery);
    const [result, setResult] = useState(initialResult);

    const handleFetch = async () => {
        onFetching?.();

        const { data, error } = await tryCatch(
            fetchDate(query, hint, region, format)
        );

        if (error) {
            onError?.(error);
        } else {
            setResult(data);
            onSelected?.(data);
        }

        onDone?.(error);
    };

    return (
        <div>
            <input
                className="aidp-date"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            />
            <button
                className="aidp-button"
                type="button"
                onClick={handleFetch}
            >
                ✔
            </button>
            <div className="aidp-result">{result}</div>
        </div>
    );
}
