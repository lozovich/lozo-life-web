import {
  ColumnDataType,
  ColumnElementType
} from 'store/reducers/column.reducer';
import { TaskConstant, TaskDataType } from 'store/reducers/task.reducer';

export type BoardCardType = {
  index: number;
  column: ColumnElementType | undefined | null;
  tasks: TaskConstant[];
  setShowAddCard: (args: ColumnElementType | undefined | null) => any;
  showAddCard: boolean;
  boardId?: string;
};

export interface BoardType {
  tasks: TaskDataType;
  columns: ColumnDataType;
  columnOrder: string[];
}
