const sass = require('@stencil/sass');

exports.config = {
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
  watch: true
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
