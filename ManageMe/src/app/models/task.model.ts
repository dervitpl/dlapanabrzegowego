export interface Task {
  id: number;
  name: string;
  description: string;
  status: 'ToDo' | 'InProgress' | 'Done';
  functionalityId: number;
}