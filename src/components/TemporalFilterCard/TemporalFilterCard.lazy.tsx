import React, { lazy, Suspense } from 'react';

const LazyTemporalFilterCard = lazy(() => import('./TemporalFilterCard'));

const TemporalFilterCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTemporalFilterCard {...props} />
  </Suspense>
);

export default TemporalFilterCard;
