import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig({
  cacheDir: '../../../../node_modules/.vite/share-button',

  plugins: [
    ...[
      dts({
        entryRoot: 'src',
        tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
        skipDiagnostics: true,
      }),
      react(),
      nxViteTsPaths(),
    ],
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    ...{
      lib: {
        // Could also be a dictionary or array of multiple entry points.
        entry: 'src/index.ts',
        name: 'share-button',
        fileName: 'index',
        // Change this to the formats you want to support.
        // Don't forget to update your package.json as well.
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        // External packages that should not be bundled into your library.
        external: ['react', 'react-dom', 'react/jsx-runtime'],
      },
    },
    ...{
      lib: {
        entry: 'src/index.ts',
        name: 'share-core-button',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
      rollupOptions: { external: [] },
    },
  },
});
