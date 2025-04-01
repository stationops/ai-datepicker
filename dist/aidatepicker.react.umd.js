(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
    typeof define === 'function' && define.amd ? define(['react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AIDatepicker = factory(global.React));
})(this, (function (react) { 'use strict';

    const fetchDate = async function (query, hint, region, format) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const baseUrl = window && window.AI_DATEPICKER_URL || 'https://api.aidatepicker.com';
      const response = await fetch(`${baseUrl}?date=${encodeURIComponent(query)}&timezone=${timezone}&hint=${hint || ''}&region=${region || ''}&format=${format || ''}`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return await response.text();
    };
    const tryCatch = async function (promise) {
      try {
        const data = await promise;
        return {
          data,
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error
        };
      }
    };

    function AIDatepicker({
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
      const [query, setQuery] = react.useState('');
      const [result, setResult] = react.useState('');
      const handleFetch = async () => {
        onFetching?.();
        const {
          data,
          error
        } = await tryCatch(fetchDate(query, hint, region, format) // 🧠 Pass hint
        );
        if (error) {
          onError?.(error);
        } else {
          setResult(data);
          onSelected?.(data);
        }
        onDone?.(error);
      };
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        class: "aidp-date",
        placeholder: placeholder,
        value: query,
        onChange: e => setQuery(e.target.value),
        onKeyDown: e => e.key === 'Enter' && handleFetch()
      }), /*#__PURE__*/React.createElement("button", {
        class: "aidp-button",
        type: "button",
        onClick: handleFetch
      }, "\u2714"), /*#__PURE__*/React.createElement("div", {
        class: "aidp-result"
      }, result));
    }

    return AIDatepicker;

}));
