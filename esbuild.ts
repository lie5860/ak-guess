const esbuild = require('esbuild');
const stylePlugin = require('esbuild-style-plugin');
const time1 = +new Date();
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
    loader: {'.jpg': 'binary', '.png': 'binary', '.js': 'jsx'},
    plugins: [
      stylePlugin()
    ]

  }).then(() => {

  console.log(`编译完成 耗时 ${new Date().valueOf() - time1}ms`)
})
  .catch(() => {
    console.log(`error`)
    process.exit(1)
  });
