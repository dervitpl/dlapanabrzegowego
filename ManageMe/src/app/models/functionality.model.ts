import { Task } from "./project.model";

export interface Functionality {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  projectId: number;
  status?: string;
}