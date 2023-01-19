import React, { lazy, Suspense } from 'react';

const LazyCardDropdown = lazy(() => import('./CardDropdown'));

const CardDropdown = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCardDropdown {...props} />
  </Suspense>
);

export default CardDropdown;
