import classNames from 'classnames';
import Button from 'components/button';
import { useCallback, useState } from 'react';
import MoreOption from './components';

const RightSubHeaderSection = () => {
  const [show, setShow] = useState(false);

  const hide = useCallback(() => {
    setShow((prevState) => !prevState);
  }, []);

  return (
    <section className='right-sub-header'>
      <Button className='white__card' onClick={hide}>
        <>
          <i className='bi bi-three-dots' style={{ marginRight: '5px' }} />
          See More
        </>
      </Button>

      <div
        className={classNames('more__option', {
          show
        })}
      >
        <div className='more__option-body'>
          <MoreOption hide={hide} parentShow={show} />
        </div>
      </div>
    </section>
  );
};

export default RightSubHeaderSection;
