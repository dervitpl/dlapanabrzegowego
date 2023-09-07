import { Injectable } from '@angular/core';
import { Functionality, Project, Task } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
  name: 'Domyslny Projekt',
  description: 'Opis',
  owner: 'Jan Kowalski',
  functionalities: []
    }
  ];

  constructor() {}

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  addProject(project: Project): void {
    this.projects.push(project);
  }

  deleteProject(id: number): void {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }

  updateProject(updatedProject: Project): void {
    const index = this.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
  }
  addFunctionality(projectId: number, functionality: Functionality): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.functionalities.push(functionality);
    }
  }
  removeFunctionality(projectId: number, functionalityId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const index = project.functionalities.findIndex(f => f.id === functionalityId);
      if (index > -1) {
        project.functionalities.splice(index, 1);
      }
    }
  }

  addTask(projectId: number, functionalityId: number, task: Task): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const functionality = project.functionalities.find(f => f.id === functionalityId);
      if (functionality) {
        functionality.tasks.push(task);
      }
    }
  }

  removeTask(projectId: number, functionalityId: number, taskId: number): void {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      const functionality = project.functionalities.find(f => f.id === functionalityId);
      if (functionality) {
        const index = functionality.tasks.findIndex(t => t.id === taskId);
        if (index > -1) {
          functionality.tasks.splice(index, 1);
        }
      }
    }
  }
}
