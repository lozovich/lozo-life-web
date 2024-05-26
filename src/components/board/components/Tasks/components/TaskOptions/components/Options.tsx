/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prettier/prettier */

import { useCallback } from 'react';

type Props = {
    name: string;
    icon: string;
    toggleBackdrop: () => void
    onClick: () => void
}

const Options = ({ name, icon, toggleBackdrop, onClick }: Props) => {

    const handleClick = useCallback(() => {
        toggleBackdrop();
        onClick();
    }, [onClick, toggleBackdrop]);

    return (
        <li className='task__options-option' onClick={handleClick}>
            <i className={icon} />
            <span>{name}</span>
        </li>
    );
};

export default Options;
