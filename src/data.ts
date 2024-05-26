export default {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'I am task 1 Lorem Impsum Lorem Ipsum Lorem Ipsum'
    },
    'task-2': { id: 'task-2', content: 'I am task 2' },
    'task-3': { id: 'task-3', content: 'I am task 3' },
    'task-4': { id: 'task-4', content: 'I am task 4' },
    'task-5': { id: 'task-5', content: 'I am task 5' },
    'task-6': { id: 'task-6', content: 'I am task 6' },
    'task-7': { id: 'task-7', content: 'I am task 7' },
    'task-8': { id: 'task-8', content: 'I am task 8' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: [
        'task-1',
        'task-2',
        'task-3',
        'task-4',
        'task-5',
        'task-6',
        'task-7',
        'task-8'
      ]
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2']
};
