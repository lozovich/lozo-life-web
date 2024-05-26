import classNames from 'classnames';
import LabelSelection from 'core/LabelSelection';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StoreType } from 'store';
import AboutBoard from './components/AboutBoard';
import ChangeBackground from './components/ChangeBackground';

type Props = {
  hide: () => void;
  parentShow: boolean;
};

const MoreOption = ({ hide, parentShow }: Props) => {
  const [route, setRoute] = useState('');
  const { data: boardData } = useSelector(
    (store: StoreType) => store.BoardReducer
  );

  const { id } = useParams<{ id: string }>();
  const generateTitle = useCallback(() => {
    switch (route) {
      case 'board':
        return 'About this board';
      case 'background':
        return 'Colors';
      case 'labels':
        return 'Labels';
      default:
        return 'Menu';
    }
  }, [route]);

  useEffect(
    () => () => {
      setRoute('');
    },
    [parentShow]
  );

  return (
    <section style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className='head'>
        {route && (
          <i className='bi bi-chevron-left' onClick={() => setRoute('')} />
        )}
        <span>{generateTitle()}</span>
        <i className='bi bi-x-lg ' onClick={hide} />
      </div>

      <div style={{ position: 'relative', height: '100%' }}>
        <div className='info'>
          <div className='info__menu' onClick={() => setRoute('board')}>
            <i className='bi bi-kanban-fill ' />
            <p>About this board</p>
          </div>

          <div className='info__menu' onClick={() => setRoute('background')}>
            <div
              className='icon'
              style={{ backgroundColor: boardData?.backgroundColor }}
            />
            <p>Change Background</p>
          </div>

          <div className='info__menu' onClick={() => setRoute('labels')}>
            <i className='bi bi-tags' />
            <p>Labels</p>
          </div>
        </div>

        <div
          className={classNames('panel', {
            show:
              route === 'board' || route === 'background' || route === 'labels'
          })}
        >
          <div className='panel__body'>
            {route === 'board' && <AboutBoard />}
            {route === 'background' && (
              <ChangeBackground boardData={boardData} />
            )}
            {route === 'labels' && (
              <div className='p-2'>
                <LabelSelection clickOnEdit boardId={id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreOption;
