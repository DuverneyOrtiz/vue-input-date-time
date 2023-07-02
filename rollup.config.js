// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue2'
import del from 'rollup-plugin-delete'

import buble from 'rollup-plugin-buble';

import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';

export default [
    {
        input: 'src/InputDateTime.vue',
        output: [            
            {
                format: 'es',
                file: 'dist/InputDateTime/index.js',                

            },
            {
                format: 'es',
                file: 'dist/InputDateTime/InputDateTime.esm.js',                

            },
            {
                format: 'esm',
                file: 'dist/InputDateTime/InputDateTime.esm.js',
                
            },
            {
                format: 'cjs',
                file: 'dist/InputDateTime/InputDateTime.ssr.js',
                
                plugins: [terser()],
            },
            {
                format: 'iife',
                file: 'dist/InputDateTime/InputDateTime.min.js',
                name: 'InputDate',
                
                plugins: [terser()],
            }

        ],
        plugins: [
            del({ targets: ['dist/Clock/*', 'dist/InputDateTime/*', 'InputDateTime2.js', 'Clock.js'] }),
            json(),
            vue({ css: true, preprocessStyles: true, template: { optimizeSSR: true } }),
            postcss({
                plugins: [postcssImport()]
            }),
            nodeResolve({ browser: true, jsnext: true, main: true }),
            buble(),
            commonjs()
        ],
        external: ['vue']
    },
    {
        input: 'src/components/Clock.vue',
        output: [
            {
                format: 'es',
                file: 'dist/Clock/index.js',                

            },
            {
                format: 'es',
                file: 'dist/Clock/Clock.esm.js',
                

            },
            {
                format: 'esm',
                file: 'dist/Clock/Clock.esm.js',
                
            },
            {
                format: 'cjs',
                file: 'dist/Clock/Clock.ssr.js',
                
                plugins: [terser()],
            },
            {
                format: 'iife',
                file: 'dist/Clock/Clock.min.js',
                name: 'ImputTime',
                
                plugins: [terser()],
            }

        ],
        plugins: [
            json(),
            vue({ css: true, preprocessStyles: true, template: { optimizeSSR: true } }),
            postcss({
                plugins: [postcssImport()]
            }),
            nodeResolve({ browser: true, jsnext: true, main: true }),
            buble(),
            commonjs()
        ],
        external: ['vue']
    },
];