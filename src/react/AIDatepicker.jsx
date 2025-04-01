import { useState } from 'react';
import { fetchDate, tryCatch } from '../core';

export default function AIDatepicker({
                                         aidp = 'default',
                                         placeholder = 'eg: Next Monday',
                                         region,
                                         format,
                                         hint,
                                         onFetching,
                                         onSelected,
                                         onError,
                                         onDone
                                     }) {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');

    const handleFetch = async () => {
        onFetching?.();

        const { data, error } = await tryCatch(
            fetchDate(query, hint, region, format) // 🧠 Pass hint
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
                class="aidp-date"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            />
            <button class="aidp-button"
                    type="button"
                    onClick={handleFetch}>
                ✔
            </button>
            <div  class="aidp-result">{result}</div>
        </div>
    );
}
