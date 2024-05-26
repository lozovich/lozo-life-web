/* eslint-disable new-cap */

import classNames from 'classnames';
import isInViewport from 'hooks/isInViewport';
import { DropDownType } from 'interfaces';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  // eslint-disable-next-line prettier/prettier
  useState
} from 'react';

const DropDown = ({
  buttonId = '',
  buttonText = '',
  title = '',
  children,
  buttonClass = '',
  className = '',
  style,
  icon,
  hideTitle = false,
  render,
  buttonStyle,
  stopPropagation = false,
  pos
}: DropDownType) => {
  const [showDropDown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dropdownBodyRef = useRef<HTMLDivElement>(null);
  const [isOutsideViewport, setIsOutsideViewport] = useState(false);

  const onClose = useCallback(
    (e) => {
      if (stopPropagation) e.stopPropagation();
      setShowDropdown(false);
    },
    [stopPropagation]
  );

  const handleButtonClick = useCallback(
    (e) => {
      if (stopPropagation) e.stopPropagation();
      setShowDropdown((prevState) => !prevState);
    },
    [stopPropagation]
  );

  const handleEvent = useCallback((e) => {
    if (ref.current && !ref.current?.contains(e.target)) setShowDropdown(false);
  }, []);

  useEffect(() => {
    if (!showDropDown) return;
    if (!dropdownBodyRef.current) return;
    const { rect } = isInViewport({
      element: dropdownBodyRef.current
    });

    if (rect.right >= window.innerWidth) {
      setIsOutsideViewport(true);
    } else {
      setIsOutsideViewport(false);
    }
  }, [showDropDown]);

  useLayoutEffect(() => {
    document.addEventListener('click', handleEvent, true);

    return () => {
      document.removeEventListener('click', handleEvent, true);
    };
  }, [handleEvent]);

  return (
    <>
      <div className={`dropdownComponent ${className}`} style={style} ref={ref}>
        <button
          className={`dropdownComponent__button ${buttonClass}`}
          type='button'
          id={buttonId}
          onClick={handleButtonClick}
          style={buttonStyle}
        >
          {icon}
          <span style={{ marginLeft: icon ? '0.3rem' : '0rem' }}>
            {buttonText}
          </span>
        </button>

        <div
          ref={dropdownBodyRef}
          className={classNames('dropdown__body', {
            show: showDropDown
          })}
          aria-labelledby={buttonId}
          style={{
            left: isOutsideViewport ? 0 + (pos ?? 0) : pos ?? 'auto',
            right: isOutsideViewport ? 'auto' : 0 + (pos ?? 0)
          }}
        >
          {!hideTitle && (
            <div className='dropdown__title'>
              <span>{title}</span>{' '}
              <i
                onClick={onClose}
                className='bi bi-x'
                style={{ cursor: 'pointer' }}
              />
            </div>
          )}
          {render ? render(onClose) : children}
        </div>
      </div>
    </>
  );
};

export default DropDown;
