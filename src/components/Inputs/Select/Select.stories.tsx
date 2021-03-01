import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { Select, SelectProps } from './index';

const meta: Meta = {
  title: 'Select',
  component: Select,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<SelectProps> = props => (
  <>
    <div id="root">
      <Select {...props} />
    </div>
    <div id="dropdown-root" />
  </>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
Default.args = {};
