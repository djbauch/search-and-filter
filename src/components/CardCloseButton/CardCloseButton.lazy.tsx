import React, { lazy, Suspense } from 'react';

const LazyCardCloseButton = lazy(() => import('./CardCloseButton'));

const CardCloseButton = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCardCloseButton {...props} />
  </Suspense>
);

export default CardCloseButton;
