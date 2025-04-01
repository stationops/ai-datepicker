const fetchDate = async function(query) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await fetch(`http://localhost:8080/date?date=${encodeURIComponent(query)}&timezone=${timezone}`);
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
}

(function(){



    const handleEvent = async function (event, attr) {
        const el = document.querySelector(`[data-aidp="${attr}"]`);
        const resultEl = document.querySelector(`[data-aidp-result="${attr}"]`);

        if (!el || !resultEl) {
            return;
        }

        el.dispatchEvent(new CustomEvent('fetching', {
            bubbles: true
        }));

        const result = await tryCatch(fetchDate(el.value))
        if(result.error){
            el.dispatchEvent(new CustomEvent('error', {
                detail: result.error,
                bubbles: true
            }));
        }else{
            resultEl.innerHTML = result.data
            el.dispatchEvent(new CustomEvent('selected', {
                detail: result.data,
                bubbles: true
            }));

        }

        el.dispatchEvent(new CustomEvent('done', {
            detail: result.error,
            bubbles: true
        }));


    }

    const addButtonListener = function(attr){
        const el = document.querySelector(`[data-aidp-button="${attr}"]`);

        if(!el){
            return;
        }

        el.addEventListener('click', event => handleEvent(event, attr));
    }

    window.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('input[data-aidp]').forEach(el => {

            console.log(el)
            const attr = el.getAttribute('data-aidp');

            addButtonListener(attr)
            el.addEventListener('keydown', event => {
                if (event.key === 'Enter') {
                    handleEvent(event, attr)
                }
            });
        });
    }, false);
})()


export { fetchDate, tryCatch }