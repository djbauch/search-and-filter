import React, { lazy, Suspense } from 'react';

const LazyFrequencyFilterCard = lazy(() => import('./FrequencyFilterCard'));

const FrequencyFilterCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFrequencyFilterCard {...props} />
  </Suspense>
);

export default FrequencyFilterCard;
