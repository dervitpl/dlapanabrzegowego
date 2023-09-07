export interface Functionality {
    id: number;
    projectId: number;
    name: string;
    description: string;
    status: 'notStarted' | 'inProgress' | 'completed';
  }
  