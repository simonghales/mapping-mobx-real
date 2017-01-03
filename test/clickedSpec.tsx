import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';
import Clicked from '../src/components/clicked';

describe('The Clicked component', () => {
    let renderer: React.ShallowRenderer;
    let output: any;

    beforeEach(() => {
        renderer = ReactTestUtils.createRenderer();
        renderer.render(<Clicked/>);
        output = renderer.getRenderOutput();
    });

    it('should be a div', () => {
        expect(output.type).toBe('div');
    });

    it('should have 3 children', () => {
        expect(output.props.children.length).toBe(3);
    });
});
