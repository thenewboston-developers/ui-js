import React, { FC, ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import QrCode from 'qrcode';

export interface QrProps {
  /** Optional. Extra classNames you can pass. */
  className?: string;
  /** Optional. margin for QR component. */
  margin?: number;
  /** Required. The content for QR code. */
  text: string;
  /** Optional. width size. */
  width?: number;
}

/**
 * Qr component.
 */
const Qr: FC<QrProps> = ({ className, margin = 0, text, width = 140 }) => {
  const [qr, setQr] = useState<ReactNode | null>(null);

  useEffect(() => {
    const generateQR = async (): Promise<void> => {
      const url = await QrCode.toDataURL(text, {
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        margin,
        width,
      });
      setQr(<img alt="QR Code" className={clsx('Qr', className)} src={url} />);
    };

    generateQR();
  }, [className, margin, text, width]);

  return <>{qr}</>;
};

export default Qr;
