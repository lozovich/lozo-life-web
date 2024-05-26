/* eslint-disable prettier/prettier */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskAction } from 'store/actions';
import { TaskConstant } from 'store/reducers/task.reducer';
import Options from './components/Options';

type Props = {
    toggleBackdrop: () => void,
    position: DOMRect,
    task: TaskConstant
}

const TaskOptions = ({ toggleBackdrop, position, task }: Props) => {
    const dispatch = useDispatch();

    const handleDelete = useCallback(() => {
        deleteTaskAction({
            dispatch,
            data: {
                taskID: task.taskId,
                columnId: task.listId,
                boardId: task?.boardId ?? ''
            }
        });
    }, [dispatch, task?.boardId, task?.listId, task?.taskId]);


    return (
        <div className='task__options' style={{ top: `${position.top}px`, left: `${position.right + 10}px` }}
        >
            <ul className='task__options-body'>
                <Options name='Delete' icon='bi bi-archive-fill' toggleBackdrop={toggleBackdrop} onClick={handleDelete} />
            </ul>
        </div>
    );
};

export default TaskOptions;
