// rollup.config.js
import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

// Vue build
const vueConfig = {
    input: 'src/vue/AIDatepicker.vue',
    output: {
        file: 'dist/aidatepicker.vue.umd.js',
        format: 'umd',
        name: 'AIDatepicker',
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


const jsConfig = {
    input: 'src/js/index.js',
    output: {
        file: 'dist/aidatepicker.js.umd.js',
        format: 'umd',
        name: 'AIDatepicker'
    },
    plugins: [
        resolve(),
        commonjs(),
        postcss()
    ]
};

// React build
const reactConfig = {
    input: 'src/react/AIDatepicker.jsx',
    output: {
        file: 'dist/aidatepicker.react.umd.js',
        format: 'umd',
        name: 'AIDatepicker', // will be available as window.AIDatepicker
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

export default [vueConfig, reactConfig, jsConfig];
