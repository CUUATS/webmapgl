const sass = require('@stencil/sass');

exports.config = {
  namespace: 'webmapgl',
  outputTargets: [
    {
      type: 'dist'
    }
  ],
  plugins: [
    sass()
  ],
  globalScript: 'src/global/webmapgl.ts',
  globalStyle: 'src/global/webmapgl.css'
};
