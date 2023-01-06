import * as React from 'react';

interface PropsType {
    label: string,
}

const LazyParallelOne = ((props: PropsType) => {
    const { label } = props;

    return (
        <div>
            Komponent: {label}
        </div>
    );
});

export default LazyParallelOne;
