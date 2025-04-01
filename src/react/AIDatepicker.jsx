import React, { useState } from 'react';
import {fetchDate, tryCatch} from "../core";



export default function AIDatepicker({ aidp = 'default', placeholder = 'Enter a date query', onFetching, onSelected, onError, onDone }) {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');

    const handleFetch = async () => {
        onFetching?.();

        const { data, error } = await tryCatch(fetchDate(query));

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
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
                data-aidp={aidp}
            />
            <button type="button" onClick={handleFetch} data-aidp-button={aidp}>
                Fetch
            </button>
            <div data-aidp-result={aidp}>{result}</div>
        </div>
    );
}
