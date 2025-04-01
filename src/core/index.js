const fetchDate = async function(query, hint, region, format) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const baseUrl = (window && window.AI_DATEPICKER_URL) || 'https://api.aidatepicker.com'
    const response = await fetch(`${baseUrl}?date=${encodeURIComponent(query)}&timezone=${timezone}&hint=${hint || ''}&region=${region || ''}&format=${format || ''}`);
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