import React, { lazy, Suspense } from 'react';

const LazyTopologicalFilterCard = lazy(() => import('./TopologicalFilterCard'));

const TopologicalFilterCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTopologicalFilterCard {...props} />
  </Suspense>
);

export default TopologicalFilterCard;
