export interface Task {
    id: number;
    functionalityId: number;
    name: string;
    status: 'todo' | 'doing' | 'done';
  }
  