/* eslint-disable prettier/prettier */
import DropDown from 'core/DropDown';
import LabelSelection from 'core/LabelSelection';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'store';
import { TaskConstant } from 'store/reducers/task.reducer';

type Props = {
  task: TaskConstant;
};

const TaskLabelsShow = ({ task }: Props) => {
  const { labels } = useSelector((store: StoreType) => store.LabelReducer);

  const findLabelData = useCallback(
    (labelId) => labels.find((label) => label.labelId === labelId),
    [labels]
  );

  return (
    <div className=' d-flex taskLabelShow'>
      <p className='taskLabelShow__title'> Labels</p>

      <div className='d-flex align-items-center flex-wrap'>
        {task?.labels &&
          task?.labels.map((labelId) => (
            <DropDown
              key={labelId}
              title='Labels'
              buttonId='Labels-title-dropdown-button'
              buttonText={findLabelData(labelId)?.name ?? ''}
              buttonClass='taskLabelShow__label'
              buttonStyle={{
                backgroundColor: `${findLabelData(labelId)?.backgroundColor ?? ''
                  }`,
                marginRight: '5px'
              }}
            >
              <LabelSelection boardId={task.boardId} task={task} />
            </DropDown>
          ))}
        {/* <p className='taskLabelShow__label'>Trello Tip</p> */}
        <DropDown
          title='Labels'
          buttonId='Labels-add-dropdown-button'
          buttonText={<i className='bi bi-plus-lg' />}
          buttonClass='taskLabelShow__addMore'
        >
          <LabelSelection boardId={task.boardId} task={task} />
        </DropDown>
      </div>
    </div>
  );
};

export default TaskLabelsShow;
