/* eslint-disable prettier/prettier */
import { useMemo } from 'react';
import Lottie from 'react-lottie';

type Props = {
    width?: number;
    height?: number;
    json: any;
};

const LottieContainer = ({ width = 400, height = 400, json }: Props) => {
    const defaultOptions = useMemo(
        () => ({
            loop: true,
            autoplay: true,
            animationData: json,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }),
        [json]
    );

    return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieContainer;
