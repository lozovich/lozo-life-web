/* eslint-disable no-plusplus */
import { useCallback } from 'react';
import { TaskConstant } from 'store/reducers/task.reducer';
import TaskMemberList from './components/TaskMemberList';
import './style.scss';

type Props = {
  task: TaskConstant;
};

const TaskFooter = ({ task }: Props) => {
  const generateText = useCallback(() => {
    const checkListGroups = task?.checkListGroups ?? [];

    let totalCheckLists = 0;
    let completedCheckLists = 0;

    checkListGroups.forEach((checkListGroup) => {
      const checkLists = checkListGroup?.checkLists ?? [];

      checkLists.forEach((checkList) => {
        if (checkList.isDone) completedCheckLists++;

        totalCheckLists++;
      });
    });

    return {
      text: `${completedCheckLists}/${totalCheckLists}`,
      count: totalCheckLists
    };
  }, [task?.checkListGroups]);

  return (
    <div className='taskFooter'>
      {/* <p className='light__color '>
        <i className='bi bi-clock mr-1' /> Mar 10
      </p> */}
      <div className='info'>
        {task?.description && (
          <p className='light__color'>
            <i className='bi bi-justify-left ' />
          </p>
        )}

        {task?.checkListGroups &&
          task?.checkListGroups.length > 0 &&
          generateText().count > 0 && (
            <p className='light__color '>
              <i className='bi bi-check2-square ' /> {generateText().text}
            </p>
          )}

        {task?.taskCommentCount && task?.taskCommentCount > 0 ? (
          <p className='light__color '>
            <i className='bi bi-chat' /> {task?.taskCommentCount}
          </p>
        ) : (
          ''
        )}
      </div>

      <TaskMemberList task={task} />
    </div>
  );
};

export default TaskFooter;
