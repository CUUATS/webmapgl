exports.config = {
  bundles: [
    {
      components: [
        'gl-legend',
        'gl-map',
        'gl-panel-toggle',
        'gl-style'
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
