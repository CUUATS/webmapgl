const sass = require('@stencil/sass');

exports.config = {
  serviceWorker: {
    swSrc: 'src/sw.js'
  },
  copy: [
    {
      src: 'styles'
    }
  ],
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
