import React, { lazy, Suspense } from 'react';

const LazyOrganizationFilterCard = lazy(() => import('./OrganizationFilterCard'));

const OrganizationFilterCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOrganizationFilterCard {...props} />
  </Suspense>
);

export default OrganizationFilterCard;
