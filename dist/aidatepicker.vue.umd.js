(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
    typeof define === 'function' && define.amd ? define(['vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AIDatepicker = factory(global.Vue));
})(this, (function (vue) { 'use strict';

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

    const _hoisted_1 = ["placeholder"];
    const _hoisted_2 = { class: "aidp-result" };


    var script = {
      __name: 'AIDatepicker',
      props: {
      modelValue: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: 'eg: Next Monday'
      },
      hint: {
        type: String,
        required: false
      },
      region: {
        type: String,
        required: false
      },
      format: {
        type: String,
        required: false
      }
    },
      emits: ['update:modelValue', 'fetching', 'error', 'selected', 'done'],
      setup(__props, { emit: __emit }) {

    const props = __props;

    const emit = __emit;

    const query = vue.ref('');
    const result = vue.ref(props.modelValue || '');

    vue.watch(() => props.modelValue, (newVal) => {
      result.value = newVal;
    });

    const handleFetch = async () => {
      emit('fetching');

      const { data, error } = await tryCatch(fetchDate(query.value, props.hint, props.region, props.format));

      if (error) {
        emit('error', error);
      } else {
        result.value = data;
        emit('update:modelValue', data);
        emit('selected', data);
      }

      emit('done', error);
    };

    return (_ctx, _cache) => {
      return (vue.openBlock(), vue.createElementBlock("div", null, [
        vue.withDirectives(vue.createElementVNode("input", {
          class: "aidp-date",
          placeholder: __props.placeholder,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((query).value = $event)),
          onKeydown: vue.withKeys(handleFetch, ["enter"])
        }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_1), [
          [vue.vModelText, query.value]
        ]),
        vue.createElementVNode("button", {
          class: "aidp-button",
          type: "button",
          onClick: handleFetch
        }, " ✔ "),
        vue.createElementVNode("div", _hoisted_2, vue.toDisplayString(result.value), 1 /* TEXT */)
      ]))
    }
    }

    };

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\ninput[data-v-6e72e974] {\r\n  margin-right: 0.5rem;\n}\n.aidp-result[data-v-6e72e974] {\r\n  min-height: 1.5rem;\r\n  margin-top: 0.5rem;\n}\r\n";
    styleInject(css_248z);

    script.__scopeId = "data-v-6e72e974";
    script.__file = "src/vue/AIDatepicker.vue";

    return script;

}));
