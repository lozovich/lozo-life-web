import { updateTaskLabelsApi } from 'api';
import { LabelSelectionType } from 'interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'store';
import { updateTaskLabel } from 'store/actions';
import ChangeLabelSection from './ChangeLabelSection';
import DropDown from './DropDown';

const LabelSelection = ({
  clickOnEdit = false,
  boardId = '',
  task
}: LabelSelectionType) => {
  const [search, setSearch] = useState('');
  const { labels } = useSelector((store: StoreType) => store.LabelReducer);
  const [filterLabel, setFilterLabel] = useState(labels);
  const taskList = useSelector((store: StoreType) => store.TaskReducer);
  const dispatch = useDispatch();

  const handleLabelSelect = useCallback(
    async (labelId: string) => {
      if (!labelId || !task) return;

      const { labels: taskLabels = [] } = taskList[task.taskId];

      const lbl = taskLabels.includes(labelId)
        ? taskLabels.filter((lblId) => lblId !== labelId)
        : [...taskLabels, labelId];

      dispatch(
        updateTaskLabel({
          taskId: task.taskId,
          labels: lbl
        })
      );

      await updateTaskLabelsApi({
        taskId: task.taskId,
        labelId
      });
    },
    [dispatch, task, taskList]
  );

  const handleSearch = useCallback(
    (e: any) => {
      const val = e.target.value;
      setSearch(val);

      if (!val) {
        return setFilterLabel(labels);
      }

      setFilterLabel(
        labels.filter((lbl) =>
          lbl.name.toLowerCase().includes(val.toLowerCase())
        )
      );
    },
    [labels]
  );

  useEffect(() => {
    setFilterLabel(labels);

    return () => setFilterLabel([]);
  }, [labels]);

  return (
    <div className='labelSelection my-3'>
      <input
        type='text'
        placeholder='Search Labels...'
        value={search}
        onChange={handleSearch}
      />

      <p className='labelSelection__title'>Labels</p>

      {filterLabel.length === 0 && <p>No Labels Found!!</p>}

      <div
        className='d-flex labelSelection__body w-100'
        style={{ flexDirection: 'column' }}
      >
        {filterLabel.map((lbl) => (
          <div className='labelSelection__container' key={lbl?.labelId}>
            {clickOnEdit ? (
              <DropDown
                title='Change label'
                buttonId='Labels-edit-button1'
                buttonText={lbl.name}
                className='w-100'
                buttonClass='labelSelection__button'
                buttonStyle={{ backgroundColor: `${lbl.backgroundColor}` }}
                render={(onClose) => (
                  <ChangeLabelSection
                    boardId={boardId}
                    hide={onClose}
                    data={lbl}
                  />
                )}
              />
            ) : (
              <button
                type='button'
                className='labelSelection__button'
                style={{ backgroundColor: `${lbl.backgroundColor}` }}
                onClick={() => handleLabelSelect(lbl?.labelId)}
              >
                <div className='d-flex justify-content-between w-100'>
                  <span>{lbl.name}</span>
                  {task && task.labels?.includes(lbl?.labelId) && (
                    <i className='bi bi-check2' />
                  )}
                </div>
              </button>
            )}
            <DropDown
              title='Change label'
              buttonId='Labels-edit-button1'
              buttonText={<i className='bi bi-pencil labelSelection__edit' />}
              buttonClass='labelSelection__editButton'
              render={(onClose) => (
                <ChangeLabelSection
                  boardId={boardId}
                  hide={onClose}
                  data={lbl}
                />
              )}
            />
          </div>
        ))}

        <DropDown
          title='Add label'
          buttonId='Labels-create-button1'
          buttonText='Create a new label'
          className='w-100'
          render={(onClose) => (
            <ChangeLabelSection create boardId={boardId} hide={onClose} />
          )}
        />
      </div>
    </div>
  );
};

export default LabelSelection;
