import * as React from 'react';
import { render } from '@testing-library/react';

import { Icon, IconType } from './index';

describe('Thing', () => {
  it('renders without crashing', () => {
    render(<Icon icon={IconType.alert} />);
  });
});
