import React, { lazy, Suspense } from 'react';

const LazyFilterSummaryCard = lazy(() => import('./FilterSummaryCard'));

const FilterSummaryCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFilterSummaryCard {...props} />
  </Suspense>
);

export default FilterSummaryCard;
