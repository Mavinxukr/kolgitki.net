import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/Wrappers/Stock/Stock'),
  { ssr: false },
);

export default DynamicComponentWithNoSSR;
