import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'store';
import { TaskConstant } from 'store/reducers/task.reducer';
import './style.scss';

type Props = {
  task: TaskConstant;
};

const TaskLabelChips = ({ task }: Props) => {
  const { labels } = useSelector((store: StoreType) => store.LabelReducer);
  const getLabelData = useCallback(
    (labelId: string) => labels.find((lbl) => lbl.labelId === labelId),
    [labels]
  );

  return (
    <div className='labelChips'>
      {task.labels &&
        task.labels.map((labelId) => (
          <p
            key={labelId}
            style={{
              backgroundColor: `${getLabelData(labelId)?.backgroundColor}`
            }}
          >
            {getLabelData(labelId)?.name}
          </p>
        ))}
    </div>
  );
};

export default TaskLabelChips;
