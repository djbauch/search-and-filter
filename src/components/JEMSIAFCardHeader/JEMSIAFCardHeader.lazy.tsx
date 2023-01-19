import React, { lazy, Suspense } from 'react';

const LazyJEMSIAFCardHeader = lazy(() => import('./JEMSIAFCardHeader'));

const JEMSIAFCardHeader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyJEMSIAFCardHeader {...props} />
  </Suspense>
);

export default JEMSIAFCardHeader;
