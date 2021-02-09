import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { Icon, IconProps, IconType } from './index';

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
      const icon = screen.getByTestId('Icon');

      expect(icon).toHaveAttribute('role', 'img');
      expect(icon).not.toHaveAttribute('role', 'button');
    });

    it('renders with proper default className', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('Icon');

      expect(icon.className).toBe('Icon');
    });

    it('renders without the --button className', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('Icon');

      expect(icon.className).not.toContain('Icon--button');
    });

    it('renders with className passed in', () => {
      render(<Icon {...props} className="test" />);
      const icon = screen.getByTestId('Icon');

      expect(icon.className).toContain('test');
    });

    it('renders with size passed in', () => {
      render(<Icon {...props} size={100} />);
      const svg = screen.getByTestId('Icon__svg');

      expect(svg).toHaveAttribute('height', '100');
      expect(svg).toHaveAttribute('width', '100');
    });

    it('renders with total size passed in', () => {
      render(<Icon {...props} totalSize={100} />);
      const icon = screen.getByTestId('Icon');

      expect(icon.style).toHaveProperty('height', '100px');
      expect(icon.style).toHaveProperty('width', '100px');
    });

    it('renders with proper total size when totalSize < size', () => {
      render(<Icon {...props} size={100} totalSize={50} />);
      const icon = screen.getByTestId('Icon');
      const svg = screen.getByTestId('Icon__svg');

      expect(svg).toHaveAttribute('height', '100');
      expect(svg).toHaveAttribute('width', '100');
      expect(icon.style).toHaveProperty('height', '100px');
      expect(icon.style).toHaveProperty('width', '100px');
    });

    it('icon does not have focus when it does not have onClick', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('Icon');

      userEvent.tab();
      expect(icon).not.toHaveFocus();
    });
  });

  describe('with onClick', () => {
    const props = {
      ...baseProps,
      onClick: () => {
        console.log('testing onClick');
      },
      onKeyDown: () => {
        console.log('testing onKeyDown');
      },
    };

    let consoleSpy: jest.SpyInstance;
    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders with proper role', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('Icon');

      expect(icon).toHaveAttribute('role', 'button');
      expect(icon).not.toHaveAttribute('role', 'img');
    });

    it('renders with the --button className', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('Icon');

      expect(icon.className).toContain('Icon--button');
    });

    it('has --disabled className when disabled', () => {
      render(<Icon {...props} disabled />);
      const icon = screen.getByTestId('Icon');

      expect(icon.className).toContain('Icon--disabled');
    });

    it('adds --disabled className when disabled and classNames passed', () => {
      render(<Icon {...props} className="test" disabled />);
      const icon = screen.getByTestId('Icon');

      expect(icon.className).toContain('test--disabled');
    });

    it('onClick works properly', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('Icon');
      fireEvent.click(icon);

      expect(consoleSpy).toHaveBeenCalledWith('testing onClick');
    });

    it('onClick is disabled properly when disabled', () => {
      render(<Icon {...props} disabled />);
      const icon = screen.getByTestId('Icon');
      fireEvent.click(icon);

      expect(consoleSpy).not.toHaveBeenCalledWith('testing onClick');
    });

    it('icon is focusable when it has onClick', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('Icon');

      userEvent.tab();
      expect(icon).toHaveFocus();
    });

    it('icon is not focusable when it has onClick but disabled', () => {
      render(<Icon {...props} disabled />);
      const icon = screen.getByTestId('Icon');

      userEvent.tab();
      expect(icon).not.toHaveFocus();
    });

    it('icon is not focusable when it has onClick and unfocusable', () => {
      render(<Icon {...props} unfocusable />);
      const icon = screen.getByTestId('Icon');

      userEvent.tab();
      expect(icon).not.toHaveFocus();
    });

    it('able to handle keyDown', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('Icon');

      fireEvent.keyDown(icon, { key: 'Up' });
      expect(consoleSpy).toHaveBeenCalledWith('testing onKeyDown');
    });

    it('fires onClick when pressing Enter', () => {
      render(<Icon {...props} />);
      const icon = screen.getByTestId('Icon');

      fireEvent.keyDown(icon, { key: 'Enter' });
      expect(consoleSpy).toHaveBeenCalledWith('testing onKeyDown');
      expect(consoleSpy).toHaveBeenCalledWith('testing onClick');
    });
  });
});
