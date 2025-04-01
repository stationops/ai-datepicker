(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
    typeof define === 'function' && define.amd ? define(['react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AIDatepicker = factory(global.React));
})(this, (function (React) { 'use strict';

    const fetchDate = async function (query) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const baseUrl = window && window.AI_DATEPICKER_URL || 'http://localhost:8080';
      const response = await fetch(`${baseUrl}?date=${encodeURIComponent(query)}&timezone=${timezone}`);
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
      placeholder = 'Enter a date query',
      onFetching,
      onSelected,
      onError,
      onDone
    }) {
      const [query, setQuery] = React.useState('');
      const [result, setResult] = React.useState('');
      const handleFetch = async () => {
        onFetching?.();
        const {
          data,
          error
        } = await tryCatch(fetchDate(query));
        if (error) {
          onError?.(error);
        } else {
          setResult(data);
          onSelected?.(data);
        }
        onDone?.(error);
      };
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        placeholder: placeholder,
        value: query,
        onChange: e => setQuery(e.target.value),
        onKeyDown: e => e.key === 'Enter' && handleFetch(),
        "data-aidp": aidp
      }), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: handleFetch,
        "data-aidp-button": aidp
      }, "Fetch"), /*#__PURE__*/React.createElement("div", {
        "data-aidp-result": aidp
      }, result));
    }

    return AIDatepicker;

}));
