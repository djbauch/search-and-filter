import React, { lazy, Suspense } from 'react';

const LazyLoadingDots = lazy(() => import('./LoadingDots'));

const LoadingDots = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLoadingDots {...props} />
  </Suspense>
);

export default LoadingDots;
