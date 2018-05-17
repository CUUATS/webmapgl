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
  ]
};
