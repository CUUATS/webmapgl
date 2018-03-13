const sass = require('@stencil/sass');

exports.config = {
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
