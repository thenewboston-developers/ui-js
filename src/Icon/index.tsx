import React, { forwardRef, ReactNode, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { bemify } from '@thenewboston/utils';

import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import AlertIcon from 'mdi-react/AlertIcon';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';
import BellIcon from 'mdi-react/BellIcon';
import CheckboxBlankCircleIcon from 'mdi-react/CheckboxBlankCircleIcon';
import CheckboxBlankCircleOutlineIcon from 'mdi-react/CheckboxBlankCircleOutlineIcon';
import CheckboxBlankOutlineIcon from 'mdi-react/CheckboxBlankOutlineIcon';
import CheckboxMarkedIcon from 'mdi-react/CheckboxMarkedIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import ContentCopyIcon from 'mdi-react/ContentCopyIcon';
import DevToIcon from 'mdi-react/DevToIcon';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import DownloadIcon from 'mdi-react/DownloadIcon';
import EyeIcon from 'mdi-react/EyeIcon';
import EyeOffIcon from 'mdi-react/EyeOffIcon';
import LanConnectIcon from 'mdi-react/LanConnectIcon';
import LanDisconnectIcon from 'mdi-react/LanDisconnectIcon';
import LinkIcon from 'mdi-react/LinkIcon';
import LoadingIcon from 'mdi-react/LoadingIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import PlayIcon from 'mdi-react/PlayIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import RadioboxBlankIcon from 'mdi-react/RadioboxBlankIcon';
import RadioboxMarkedIcon from 'mdi-react/RadioboxMarkedIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import SyncIcon from 'mdi-react/SyncIcon';
import ThumbsUpIcon from 'mdi-react/ThumbsUpIcon';

import TnbIcon from './TnbIcon';
import './Icon.scss';

// These names are camelCased versions of the names found in https://materialdesignicons.com/
export enum IconType {
  alert = 'alert',
  alertCircleOutline = 'alert-circle-outline',
  arrowLeft = 'arrow-left',
  arrowRight = 'arrow-right',
  bell = 'bell',
  checkboxBlankCircle = 'checkbox-blank-circle',
  checkboxBlankCircleOutline = 'checkbox-blank-circle-outline',
  checkboxBlankOutline = 'checkbox-blank-outline',
  checkboxMarked = 'checkbox-marked',
  chevronLeft = 'chevron-left',
  chevronRight = 'chevron-right',
  close = 'close',
  contentCopy = 'content-copy',
  devTo = 'dev-to',
  dotsVertical = 'dots-vertical',
  download = 'download',
  eye = 'eye',
  eyeOff = 'eye-off',
  lanConnect = 'lan-connect',
  lanDisconnect = 'lan-disconnect',
  link = 'link',
  loading = 'loading',
  pencil = 'pencil',
  play = 'play',
  plus = 'plus',
  radioboxBlank = 'radiobox-blank',
  radioboxMarked = 'radiobox-marked',
  refresh = 'refresh',
  sync = 'sync',
  thumbsUp = 'thumbs-up',
  tnb = 'tnb',
}

export interface IconProps {
  /** Optional. Extra classNames you can pass. Storybook options: black, white, primary, secondary, tertiary, alert. */
  className?: string;
  /** Optional. disabled onClick event if onClick is passed. */
  disabled?: boolean;
  /** Required. pass in the icon type, using the IconType enum. */
  icon: IconType;
  /** Optional. add an onClick event handler. */
  onClick?(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  /** Optional. add an onKeyDown event handler. */
  onKeyDown?(e?: React.KeyboardEvent<HTMLDivElement>): void;
  /** Optional. size of the actual icon. */
  size?: number;
  /** Optional. size of the icon + paddings. Ignored if value is smaller than size.  */
  totalSize?: number | 'unset';
  /** Optional. disables focus. Only works if there is also an onClick handler.  */
  unfocusable?: boolean;
}

/**
 * Icon component with optional ability to pass in an onClick event handler.
 */
const Icon = forwardRef<HTMLDivElement, IconProps>(
  (
    {
      className,
      disabled = false,
      icon,
      onClick,
      onKeyDown,
      size,
      totalSize = 30,
      unfocusable = false,
    },
    ref
  ) => {
    const divStyle = useMemo(() => {
      if (totalSize === 'unset') return {};
      const divSize = Math.max(size || 0, totalSize);
      return { height: divSize, width: divSize };
    }, [size, totalSize]);

    const tabIndex = useMemo(() => (unfocusable || !onClick ? undefined : 0), [
      onClick,
      unfocusable,
    ]);

    const handleClick = (
      e?: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      if (disabled || !onClick) return;

      onClick(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (!onClick) return;

      if (e.key === 'Enter' && !disabled) {
        handleClick();
      }

      onKeyDown?.(e);
    };

    const renderIcon = useCallback((): ReactNode => {
      switch (icon) {
        case IconType.alert:
          return <AlertIcon size={size || 24} />;
        case IconType.alertCircleOutline:
          return <AlertCircleOutlineIcon size={size || 24} />;
        case IconType.arrowLeft:
          return <ArrowLeftIcon size={size || 24} />;
        case IconType.arrowRight:
          return <ArrowRightIcon size={size || 24} />;
        case IconType.bell:
          return <BellIcon size={size || 22} />;
        case IconType.checkboxBlankCircle:
          return <CheckboxBlankCircleIcon size={size || 24} />;
        case IconType.checkboxBlankCircleOutline:
          return <CheckboxBlankCircleOutlineIcon size={size || 24} />;
        case IconType.checkboxBlankOutline:
          return <CheckboxBlankOutlineIcon size={size || 24} />;
        case IconType.checkboxMarked:
          return <CheckboxMarkedIcon size={size || 24} />;
        case IconType.chevronLeft:
          return <ChevronLeftIcon size={size || 24} />;
        case IconType.chevronRight:
          return <ChevronRightIcon size={size || 24} />;
        case IconType.close:
          return <CloseIcon size={size || 24} />;
        case IconType.contentCopy:
          return <ContentCopyIcon size={size || 22} />;
        case IconType.devTo:
          return <DevToIcon size={size || 24} />;
        case IconType.dotsVertical:
          return <DotsVerticalIcon size={size || 24} />;
        case IconType.download:
          return <DownloadIcon size={size || 24} />;
        case IconType.eye:
          return <EyeIcon size={size || 22} />;
        case IconType.eyeOff:
          return <EyeOffIcon size={size || 22} />;
        case IconType.lanConnect:
          return <LanConnectIcon size={size || 24} />;
        case IconType.lanDisconnect:
          return <LanDisconnectIcon size={size || 24} />;
        case IconType.link:
          return <LinkIcon size={size || 24} />;
        case IconType.loading:
          return <LoadingIcon size={size || 24} />;
        case IconType.pencil:
          return <PencilIcon size={size || 24} />;
        case IconType.play:
          return <PlayIcon size={size || 24} />;
        case IconType.plus:
          return <PlusIcon size={size || 24} />;
        case IconType.radioboxBlank:
          return <RadioboxBlankIcon size={size || 24} />;
        case IconType.radioboxMarked:
          return <RadioboxMarkedIcon size={size || 24} />;
        case IconType.refresh:
          return <RefreshIcon size={size || 24} />;
        case IconType.sync:
          return <SyncIcon size={size || 24} />;
        case IconType.thumbsUp:
          return <ThumbsUpIcon size={size || 20} />;
        case IconType.tnb:
          return <TnbIcon size={size || 24} />;
        default:
          return null;
      }
    }, [icon, size]);

    return (
      <div
        className={clsx('Icon', className, {
          'Icon--button': !!onClick,
          'Icon--disabled': disabled,
          ...bemify(className, '--disabled', disabled),
        })}
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={divStyle}
        tabIndex={tabIndex}
      >
        {renderIcon()}
      </div>
    );
  }
);

export { Icon };
