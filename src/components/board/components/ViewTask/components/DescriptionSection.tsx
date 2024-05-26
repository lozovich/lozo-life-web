import { addDescriptionToTask } from 'api';
import TextAreaCombo from 'core/TextAreaCombo';
import IsVisibleLayout from 'hooks/isVisibleLayout';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskInfo } from 'store/actions';
import { TaskConstant } from 'store/reducers/task.reducer';

type Props = {
  task: TaskConstant;
};

const DescriptionSection = ({ task }: Props) => {
  const [description, setDescription] = useState(task?.description ?? '');
  const TextAreaComboIds = useMemo(
    () => ({
      textarea: 'DescriptionSection_text',
      submitButton: 'DescriptionSection_submit'
    }),
    []
  );

  const [readOnly, setReadOnly, textareaRef] =
    IsVisibleLayout<HTMLTextAreaElement>(TextAreaComboIds);

  const dispatch = useDispatch();
  const handleFocus = useCallback(() => {
    setDescription(task?.description ?? '');
    setReadOnly(false);
  }, [setReadOnly, task?.description]);

  const handleClick = useCallback(async () => {
    if (!description) return;

    dispatch(
      updateTaskInfo({
        taskId: task.taskId,
        data: {
          description
        }
      })
    );

    setReadOnly(false);

    await addDescriptionToTask({
      taskId: task.taskId,
      data: {
        description
      },
      boardId: task.boardId
    });
  }, [description, dispatch, setReadOnly, task?.boardId, task?.taskId]);

  return (
    <div className='descriptionSection'>
      <p className='descriptionSection__title'>
        <i className='bi bi-justify-left ' style={{ marginRight: '10px' }} />
        <span style={{ marginRight: '10px' }}>Description</span>

        {task?.description && (
          <button type='button' onClick={() => setReadOnly(true)}>
            Edit
          </button>
        )}
      </p>

      <TextAreaCombo
        ref={textareaRef}
        readOnly={!readOnly}
        className='descriptionSection__textarea mb-2'
        placeholder='Add a more detailed description…'
        buttonText='Save'
        onFocusCapture={handleFocus}
        onSubmit={handleClick}
        textAreaId={TextAreaComboIds.textarea}
        submitButtonId={TextAreaComboIds.submitButton}
        value={!readOnly ? task?.description : description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default DescriptionSection;
