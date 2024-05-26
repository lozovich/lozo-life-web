import { ColumnElementType } from 'store/reducers/column.reducer';

type AddTaskButtonType = {
  // eslint-disable-next-line no-unused-vars
  setShowAddCard: (args: ColumnElementType | undefined | null) => any;
  column: ColumnElementType | undefined | null;
};

const AddTaskButton = ({ setShowAddCard, column }: AddTaskButtonType) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    className='add__task'
    onClick={() => {
      if (!column) return;
      setShowAddCard(column);
    }}
  >
    <i className='bi bi-plus-lg' />
    <p>Add a card</p>
  </div>
);

export default AddTaskButton;
