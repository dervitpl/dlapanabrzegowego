export interface Task {
  id: number;
  name: string;
  description: string;
  status: 'ToDo' | 'InProgress' | 'Done';
}

export interface Functionality {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  owner: string;
  functionalities: Functionality[];
}
