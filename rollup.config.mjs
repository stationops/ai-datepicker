// rollup.config.js
import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

// Vue build
const vueConfig = {
    input: 'src/vue/AIDatePicker.vue',
    output: {
        file: 'dist/aidatepicker.vue.umd.js',
        format: 'umd',
        name: 'AIDatePickerVue',
        globals: {
            vue: 'Vue'
        }
    },
    external: ['vue'],
    plugins: [
        resolve(),
        commonjs(),
        vue({ css: false }),
        postcss()
    ]
};

// React build
const reactConfig = {
    input: 'src/react/AIDatePicker.jsx',
    output: {
        file: 'dist/aidatepicker.react.umd.js',
        format: 'umd',
        name: 'AIDatePicker', // will be available as window.AIDatePicker
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
        }
    },
    external: ['react', 'react-dom'],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-react']
        }),
        postcss()
    ]
};

export default [vueConfig, reactConfig];
