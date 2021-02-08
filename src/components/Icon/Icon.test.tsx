import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Icon, IconProps, IconType } from './index';

const noop = () => {};

describe('Icon', () => {
  const baseProps: IconProps = {
    icon: IconType.alert,
  };

  describe('without onClick', () => {
    const props = {
      ...baseProps,
    };

    it('renders without crashing', () => {
      render(<Icon {...props} />);
    });

    it('renders with proper role', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('icon');

      expect(icon).toHaveAttribute('role', 'img');
      expect(icon).not.toHaveAttribute('role', 'button');
    });

    it('renders with proper default className', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('icon');

      expect(icon.className).toBe('Icon');
    });

    it('renders without the --button className', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('icon');

      expect(icon.className).not.toContain('Icon--button');
    });

    it('renders with className passed in', () => {
      render(<Icon {...props} className="test" />);
      const icon = screen.getByTestId('icon');

      expect(icon.className).toContain('test');
    });

    it('renders with size passed in', () => {
      render(<Icon {...props} size={100} />);
      const svg = screen.getByTestId('svg');

      expect(svg).toHaveAttribute('height', '100');
      expect(svg).toHaveAttribute('width', '100');
    });

    it('renders with total size passed in', () => {
      render(<Icon {...props} totalSize={100} />);
      const icon = screen.getByTestId('icon');

      expect(icon.style).toHaveProperty('height', '100px');
      expect(icon.style).toHaveProperty('width', '100px');
    });

    // TODO: Add test for when size > totalSize
  });

  describe('with onClick', () => {
    const props = {
      ...baseProps,
      onClick: noop,
    };

    it('renders with proper role', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('icon');

      expect(icon).toHaveAttribute('role', 'button');
      expect(icon).not.toHaveAttribute('role', 'img');
    });

    it('renders with the --button className', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('icon');

      expect(icon.className).toContain('Icon--button');
    });

    // TODO: add more tests
  });
});
