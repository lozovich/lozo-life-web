import { useEffect, useState } from 'react';
import { TaskCheckListGroupType } from 'store/reducers/task.reducer';

type Props = {
  checkListGroup: TaskCheckListGroupType;
};

const CardProgress = ({ checkListGroup }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const { checkLists = [] } = checkListGroup;
    const totalList = checkLists?.length;

    const countOfDone = checkLists?.filter((list) => list?.isDone)?.length ?? 0;

    const positiveVal = Math.max(0, Math.ceil((countOfDone / totalList) * 100));
    const prg = positiveVal > 100 ? 100 : positiveVal;

    setProgress(prg);
  }, [checkListGroup]);

  return (
    <div className='progress mb-3'>
      <div
        className='progress-bar'
        role='progressbar'
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {progress}%
      </div>
    </div>
  );
};

export default CardProgress;
