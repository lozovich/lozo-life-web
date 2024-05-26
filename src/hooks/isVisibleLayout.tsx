import { useCallback, useLayoutEffect, useRef, useState } from 'react';

type Props = {
  [key: string]: string;
};

const IsVisibleLayout = <T extends unknown>(
  ids: Props
): [boolean, (value: boolean) => void, React.RefObject<T>] => {
  const [show, setShow] = useState(false);
  const ref = useRef<T>(null);

  const handShowHide = useCallback((value: boolean) => {
    if (value) {
      setShow(value);
    } else {
      setShow(value);
    }
  }, []);

  const handleEvent = useCallback(
    (e) => {
      const hasId = Object.values(ids).includes(e.target?.id);
      handShowHide(hasId);
    },
    [handShowHide, ids]
  );

  useLayoutEffect(() => {
    document.addEventListener('click', handleEvent, true);

    return () => {
      document.removeEventListener('click', handleEvent, true);
    };
  }, [handleEvent]);

  return [show, handShowHide, ref];
};

export default IsVisibleLayout;
