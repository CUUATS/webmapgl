import { render } from '@stencil/core/testing';
import { WMGLApp } from './wmgl-app';

describe('my-app', () => {
  it('should build', () => {
    expect(new WMGLApp()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [WMGLApp],
        html: '<wmgl-app></wmgl-app>'
      });
    });
  });
});
