import { Suspense, ComponentType, ReactElement } from 'react';
import Loading from './loading';

type Props = Record<string, unknown>;

const Loadable = <P extends Props>(
    Component: ComponentType<P>
): ((props: P) => ReactElement) => (props: P) => (
    <Suspense fallback={<Loading />}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;