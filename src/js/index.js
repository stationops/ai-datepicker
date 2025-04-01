import {fetchDate, tryCatch} from "../core/index.js";

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

        const result = await tryCatch(fetchDate(el.value, hint, region, format))
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
})();