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
  watch: true,
  globalScript: 'src/global/webmapgl.ts',
  globalStyle: 'src/global/webmapgl.css'
};
