import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import Qr, { QrProps } from './index';
import '../../styles/colors.css';

const meta: Meta = {
  title: 'Qr',
  component: Qr,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<QrProps> = props => <Qr {...props} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const QrTemplate = Template.bind({});
QrTemplate.args = {
  text: 'Hello World',
};
