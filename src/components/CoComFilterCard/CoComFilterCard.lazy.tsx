import React, { lazy, Suspense } from 'react';

const LazyCoComFilterCard = lazy(() => import('./CoComFilterCard'));

const CoComFilterCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCoComFilterCard {...props} />
  </Suspense>
);

export default CoComFilterCard;
