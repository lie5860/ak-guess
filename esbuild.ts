const esbuild = require('esbuild');
const stylePlugin = require('esbuild-style-plugin');
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
    loader: {'.jpg': 'file', '.png': 'file', '.js': 'jsx'},
    plugins: [
      stylePlugin()
    ]

  })
  .catch(() => process.exit(1));
console.log('编译完成')
