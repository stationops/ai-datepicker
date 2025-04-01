const fetchDate = async function(query) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const baseUrl = (window && window.AI_DATEPICKER_URL) || 'http://localhost:8080'
    const response = await fetch(`${baseUrl}?date=${encodeURIComponent(query)}&timezone=${timezone}`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    return await response.text();
};


const tryCatch = async function(promise) {
    try {
        const data = await promise;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};



export { fetchDate, tryCatch }