exports.config = {
  bundles: [
    {
      components: [
        'wmgl-app',
        'wmgl-map',
        'wmgl-style'
      ]
    }
  ],
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
