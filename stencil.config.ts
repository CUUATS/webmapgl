import { sass } from '@stencil/sass';

export const config = {
  namespace: 'webmapgl',
  copy: [
    {
      src: 'styles'
    }
  ],
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  plugins: [
    sass()
  ],
  watch: true,
  globalScript: 'src/global/webmapgl.ts',
  globalStyle: 'src/global/webmapgl.css'
};
