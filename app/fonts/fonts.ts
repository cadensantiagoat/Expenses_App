import localFont from 'next/font/local';

const satoshi = localFont({
  src: [
    {
      path: '/SatoshiLight.woff',
      weight: '300',
    },
    {
      path: '/SatoshiRegular.woff',
      weight: '400',
    },
    {
      path: '/SatoshiMedium.woff',
      weight: '500',
    },
    {
      path: '/SatoshiBold.woff',
      weight: '700',
    },
  ],
  variable: '--font-satoshi',
});

export { satoshi };
