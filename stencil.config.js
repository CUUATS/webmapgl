exports.config = {
  collections: [
    { name: '@stencil/router' },
    { name: '@ionic/core' }
  ],
  serviceWorker: {
    swSrc: 'src/sw.js'
  },
  copy: [
    {
      src: 'styles'
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
