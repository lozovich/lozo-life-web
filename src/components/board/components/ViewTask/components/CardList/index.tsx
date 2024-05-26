import DropDown from 'core/DropDown';
import TextAreaCombo from 'core/TextAreaCombo';
import IsVisibleLayout from 'hooks/isVisibleLayout';
import React, {
  useCallback,
  useMemo,
  // eslint-disable-next-line prettier/prettier
  useState
} from 'react';
import { useDispatch } from 'react-redux';
import { addCheckListAction, deleteCheckListGroupAction } from 'store/actions';
import { TaskCheckListGroupType } from 'store/reducers/task.reducer';
import { v4 } from 'uuid';
import CardProgress from './components/CardProgress';
import CheckListItems from './components/CheckListItems';

type Props = {
  checkListGroup: TaskCheckListGroupType;
  boardId: string;
};

const CheckList = ({ checkListGroup, boardId }: Props) => {
  const { checkLists = [], title = '' } = checkListGroup;
  const TextAreaComboIds = useMemo(
    () => ({
      textarea: `CheckList_text_${checkListGroup?.checkListGroupId}`,
      submitButton: `CheckList_submit_${checkListGroup?.checkListGroupId}`
    }),
    [checkListGroup?.checkListGroupId]
  );
  const [showNewItemCheckList, hide, checkListTextareaRef] =
    IsVisibleLayout<HTMLTextAreaElement>(TextAreaComboIds);

  const [textareaValue, setTextareaValue] = useState('');
  const dispatch = useDispatch();
  // const tasks = useSelector((store : StoreType) => store.TaskReducer)

  const clearAll = useCallback(() => {
    setTextareaValue('');
  }, []);

  const handleItemCheckList = useCallback(
    (value: boolean) => {
      if (value === true) {
        hide(value);
      } else {
        clearAll();
        hide(value);
      }
    },
    [clearAll, hide]
  );

  const handleAddItemCheckList = useCallback(async () => {
    checkListTextareaRef.current?.focus();

    if (!textareaValue) return;

    const payload = {
      checkListId: v4(),
      title: textareaValue,
      isDone: false,
      taskId: checkListGroup.taskId ?? '',
      checkListGroupId: checkListGroup?.checkListGroupId ?? '',
      boardId
    };
    handleItemCheckList(false);
    await addCheckListAction({
      dispatch,
      data: payload
    });

    setTextareaValue('');
  }, [
    boardId,
    checkListGroup?.checkListGroupId,
    checkListGroup.taskId,
    checkListTextareaRef,
    dispatch,
    handleItemCheckList,
    textareaValue
  ]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaValue(e.target.value);
    },
    []
  );

  const handleDeleteCheckListGroup = useCallback(async () => {
    await deleteCheckListGroupAction({
      dispatch,
      data: {
        checkListGroupId: checkListGroup.checkListGroupId ?? '',
        taskId: checkListGroup?.taskId ?? '',
        boardId
      }
    });
  }, [
    boardId,
    checkListGroup.checkListGroupId,
    checkListGroup?.taskId,
    dispatch
  ]);

  return (
    <div className='checkList mt-3'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <p className='checkList__title'>
          <i className='bi bi-check2-square' style={{ marginRight: '10px' }} />

          {title}
        </p>

        <DropDown
          title='Delete Checklist?'
          buttonId='Checklist-delete-dropdown-button'
          buttonText='Delete'
          buttonClass='bg__secondary text__primary'
          buttonStyle={{ fontSize: '0.9rem' }}
          stopPropagation
        >
          <div className='checklist__options'>
            <p className='my-2'>
              Deleting a checklist is permanent and there is no way to get it
              back.
            </p>
            <button
              type='button'
              className='bg__danger text-white my-2 w-100'
              onClick={handleDeleteCheckListGroup}
            >
              Delete checklist
            </button>
          </div>
        </DropDown>
      </div>

      <CardProgress checkListGroup={checkListGroup} />

      {checkLists &&
        checkLists.length > 0 &&
        checkLists.map((list) => (
          <CheckListItems
            key={list?.checkListId}
            data={list}
            boardId={boardId}
          />
        ))}

      {showNewItemCheckList && (
        <TextAreaCombo
          className='mt-2'
          placeholder='Add an item'
          ref={checkListTextareaRef}
          buttonText='Add'
          onChange={handleChange}
          onSubmit={handleAddItemCheckList}
          value={textareaValue}
          textAreaId={TextAreaComboIds.textarea}
          submitButtonId={TextAreaComboIds.submitButton}
        />
      )}

      {!showNewItemCheckList && (
        <div className='d-flex mt-3'>
          <button
            type='button'
            className='bg__secondary text__primary addNewItem'
            style={{ fontSize: '0.9rem' }}
            onClick={() => {
              checkListTextareaRef.current?.focus();
              handleItemCheckList(true);
            }}
          >
            Add an item
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckList;
