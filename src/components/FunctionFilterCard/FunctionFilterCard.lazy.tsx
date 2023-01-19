import React, { lazy, Suspense } from 'react';

const LazyFunctionFilterCard = lazy(() => import('./FunctionFilterCard'));

const FunctionFilterCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFunctionFilterCard {...props} />
  </Suspense>
);

export default FunctionFilterCard;
