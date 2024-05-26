/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { useLayoutEffect, useState } from 'react';

const isMobileView = () => {
    const [check, setCheck] = useState(false);

    const resize = () => {

        if (window.innerWidth <= 868) setCheck(true);
        else setCheck(false);

    };

    useLayoutEffect(() => {

        resize();

        window.addEventListener('load', resize);
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('load', resize);

            resize();
        };
    }, []);


    return check;
};

export default isMobileView;
