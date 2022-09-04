const path = require('node:path');
const fs = require('node:fs')

module.exports = {
  entry: './react-csr.tsx',
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'main.[contenthash].js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.beforeCompile.tap('BeforeCompilePlugin', () => {
          const assetPath = path.join(__dirname, './assets');

          const files = fs.readdirSync(assetPath);

          for (const i in files) {
            const file = files[i]
            const filePath = path.join(assetPath, file);

            fs.rmSync(filePath)
          }
        })
      }
    }
  ]
};