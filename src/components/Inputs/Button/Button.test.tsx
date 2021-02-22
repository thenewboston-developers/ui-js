import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import {
  Button,
  ButtonColor,
  ButtonProps,
  ButtonType,
  ButtonVariant,
} from './index';

describe('Button', () => {
  let props: Omit<ButtonProps, 'children'>;
  let onClick: jest.Mock;

  beforeEach(() => {
    onClick = jest.fn();
    props = {
      onClick,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    render(<Button {...props}>Hello World</Button>);
  });

  it('renders with proper text', () => {
    render(<Button {...props}>Hello World!</Button>);

    expect(screen.getByText('Hello World!')).toBeTruthy();
  });

  it('renders with proper default className', () => {
    render(<Button {...props}>Hello World</Button>);
    const button = screen.getByTestId('Button');

    const classNames = button.className.split(' ');
    expect(classNames.includes('Button')).toBeTruthy();
    expect(classNames.includes('Button--contained')).toBeTruthy();
    expect(classNames.includes('Button--primary')).toBeTruthy();
  });

  it('renders with proper classNames when classNames prop is passed', () => {
    render(
      <Button {...props} className="test">
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    const classNames = button.className.split(' ');
    expect(classNames.includes('test')).toBeTruthy();
    expect(classNames.includes('test--contained')).toBeTruthy();
    expect(classNames.includes('test--primary')).toBeTruthy();
  });

  it('renders with proper classNames when color is primary', () => {
    render(
      <Button {...props} color={ButtonColor.primary}>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button.className).toContain('Button--primary');
  });

  it('renders with proper classNames when color is secondary', () => {
    render(
      <Button {...props} color={ButtonColor.secondary}>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button.className).toContain('Button--secondary');
  });

  it('renders with proper classNames when color is tertiary', () => {
    render(
      <Button {...props} color={ButtonColor.tertiary}>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button.className).toContain('Button--tertiary');
  });

  it('has disabled attribute if disabled is true', () => {
    render(
      <Button {...props} disabled>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button).toBeDisabled();
  });

  it('has className --disabled if disabled is true', () => {
    render(
      <Button {...props} className="test" disabled>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button.className).toContain('Button--disabled');
    expect(button.className).toContain('test--disabled');
  });

  it('triggers onClick if clicked', () => {
    render(<Button {...props}>Hello World</Button>);
    const button = screen.getByTestId('Button');

    button.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger onClick if disabled and clicked', () => {
    render(
      <Button {...props} disabled>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    button.click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('is tabbable if not disabled', () => {
    render(<Button {...props}>Hello World</Button>);
    const button = screen.getByTestId('Button');

    userEvent.tab();
    expect(button).toHaveFocus();
  });

  it('is not tabbable if disabled', () => {
    render(
      <Button {...props} disabled>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    userEvent.tab();
    expect(button).not.toHaveFocus();
  });

  it('is focused when focused is true', () => {
    render(
      <Button {...props} focused>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button).toHaveFocus();
  });

  it('is not focused when focused is true and disabled is true', () => {
    render(
      <Button {...props} disabled focused>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button).not.toHaveFocus();
  });

  it('renders with type button if type=button', () => {
    render(
      <Button {...props} type={ButtonType.button}>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders with type reset if type=reset', () => {
    render(
      <Button {...props} type={ButtonType.reset}>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button).toHaveAttribute('type', 'reset');
  });

  it('renders with type submit if type=submit', () => {
    render(
      <Button {...props} type={ButtonType.submit}>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders with proper classNames when variant is contained', () => {
    render(
      <Button {...props} variant={ButtonVariant.contained}>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button.className).toContain('Button--contained');
  });

  it('renders with proper classNames when variant is link', () => {
    render(
      <Button {...props} variant={ButtonVariant.link}>
        Hello World
      </Button>
    );
    const button = screen.getByTestId('Button');

    expect(button.className).toContain('Button--link');
  });
});
