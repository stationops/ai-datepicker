import React, { useState } from 'react';

const fetchDate = async (query) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await fetch(`http://localhost:8080/date?date=${encodeURIComponent(query)}&timezone=${timezone}`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.text();
};

const tryCatch = async (promise) => {
    try {
        const data = await promise;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};

export default function AIDatePicker({ aidp = 'default', placeholder = 'Enter a date query', onFetching, onSelected, onError, onDone }) {
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
