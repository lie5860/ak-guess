const esbuild = require('esbuild');

esbuild
    .build({
        entryPoints: ['src/index.ts'],
        outdir: 'public',
        bundle: true,
        sourcemap: false,
        minify: true,
        splitting: true,
        format: 'esm',
        target: ['esnext'],
        // external: ['react-dom', 'react'],
        loader: {'.jpg': 'file', '.png': 'file', '.js': 'jsx'}

    })
    .catch(() => process.exit(1));
console.log('编译完成')
