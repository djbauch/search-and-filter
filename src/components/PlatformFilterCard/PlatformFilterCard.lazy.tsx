import React, { lazy, Suspense } from 'react';

const LazyPlatformFilterCard = lazy(() => import('./PlatformFilterCard'));

const PlatformFilterCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPlatformFilterCard {...props} />
  </Suspense>
);

export default PlatformFilterCard;
