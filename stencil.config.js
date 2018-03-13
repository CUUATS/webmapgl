const sass = require('@stencil/sass');

exports.config = {
  copy: [
    {
      src: 'styles'
    }
  ],
  outputTargets: [
    {
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
