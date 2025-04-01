(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    const fetchDate = async function(query, hint, region, format) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const baseUrl = (window && window.AI_DATEPICKER_URL) || 'https://api.aidatepicker.com';
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


            const hint = el.getAttribute('data-aidp-hint');
            const region = el.getAttribute('data-aidp-region');
            const format = el.getAttribute('data-aidp-format');

            const result = await tryCatch(fetchDate(el.value, hint, region, format));
            if(result.error){
                el.dispatchEvent(new CustomEvent('error', {
                    detail: result.error,
                    bubbles: true
                }));
            }else {
                resultEl.innerHTML = result.data;
                el.dispatchEvent(new CustomEvent('selected', {
                    detail: result.data,
                    bubbles: true
                }));

            }

            el.dispatchEvent(new CustomEvent('done', {
                detail: result.error,
                bubbles: true
            }));


        };

        const addButtonListener = function(attr){
            const el = document.querySelector(`[data-aidp-button="${attr}"]`);

            if(!el){
                return;
            }

            el.addEventListener('click', event => handleEvent(event, attr));
        };

        window.addEventListener("DOMContentLoaded", function() {
            document.querySelectorAll('input[data-aidp]').forEach(el => {

                console.log(el);
                const attr = el.getAttribute('data-aidp');

                addButtonListener(attr);
                el.addEventListener('keydown', event => {
                    if (event.key === 'Enter') {
                        handleEvent(event, attr);
                    }
                });
            });
        }, false);
    })();

}));
