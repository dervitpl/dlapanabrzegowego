import { Component, OnInit } from '@angular/core';
import { Functionality, Project, Task } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  statusHierarchy: string[] = ['InProgress', 'ToDo', 'Done'];
  projects: Project[] = [];
  editingProjectID: number | null = null;
  editingProject: Project = {
    id: 0, name: '', description: '', owner: '',
    functionalities: []
  };
  newProject: Project = {
    id: 0,
    name: '',
    description: '',
    owner: 'Jan Kowalski',
    functionalities: []
  };
  
  selectedProject: Project | null = null;
  newFunctionality: Functionality = { id: 0, name: '', description: '', tasks: [], status: 'ToDo' };
  newTask: Task = { id: 0, name: '', description: '', status: 'ToDo' };

  editingFunctionality: Functionality | null = null;
  editingFunctionalityBackup: Functionality = { id: 0, name: '', description: '', tasks: [] };

  editingTask: Task | null = null;
  editingTaskBackup: Task = { id: 0, name: '', description: '', status: 'ToDo' };

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }

  addProject(): void {
    if (this.newProject.name.trim()) {
      this.newProject.id = Date.now();
      this.projectService.addProject({ ...this.newProject });
      this.newProject.name = '';
      this.newProject.description = '';
      this.loadProjects();
    }
  }

  loadProjects(): void {
    this.projects = this.projectService.getProjects();
  }

  deleteProject(projectId: number) {
    const index = this.projects.findIndex(p => p.id === projectId);
    if (index > -1) {
      this.projects.splice(index, 1);
    }
  }

  startEditing(project: Project) {
    this.editingProjectID = project.id;
    this.editingProject = { ...project };
  }

  saveEdit() {
    const index = this.projects.findIndex(p => p.id === this.editingProjectID);
    if (index !== -1) {
      this.projects[index] = this.editingProject;
      this.editingProjectID = null;
    }
  }

  cancelEdit() {
    this.editingProjectID = null;
  }

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  addFunctionalityToProject() {
    if (this.newFunctionality.name.trim() && this.selectedProject) {
      this.newFunctionality.id = Date.now();
      this.selectedProject.functionalities.push({ ...this.newFunctionality });
      this.newFunctionality = { id: 0, name: '', description: '', tasks: [] , status: 'ToDo'};
    }
  }

  addTaskToFunctionality(functionalityId: number) {
    if (this.newTask.name.trim() && this.selectedProject) {
      this.newTask.id = Date.now();
      const targetFunctionality = this.selectedProject.functionalities.find(f => f.id === functionalityId);
      if (targetFunctionality) {
        targetFunctionality.tasks.push({ ...this.newTask });
        
        // aktualizacja statusu funkcjonalności po dodaniu nowego zadania
        this.updateFunctionalityStatus(targetFunctionality);
  
        this.newTask = { id: 0, name: '', description: '', status: 'ToDo' };
      }
    }
  }

  deleteFunctionality(functionalityId: number) {
    if (this.selectedProject) {
      const index = this.selectedProject.functionalities.findIndex(f => f.id === functionalityId);
      if (index !== -1) {
        this.selectedProject.functionalities.splice(index, 1);
      }
    }
  }

  deleteTask(functionalityId: number, taskId: number) {
    if (this.selectedProject) {
      const functionality = this.selectedProject.functionalities.find(f => f.id === functionalityId);
      if (functionality) {
        const taskIndex = functionality.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          functionality.tasks.splice(taskIndex, 1);
          
          // aktualizacja statusu funkcjonalnosci po usunięciu zadania
          this.updateFunctionalityStatus(functionality);
        }
      }
    }
  }

  startEditingFunctionality(functionality: Functionality) {
    this.editingFunctionality = functionality;
    this.editingFunctionalityBackup = { ...functionality };
  }

  saveEditedFunctionality() {
    this.editingFunctionality = null;
  }

  cancelEditingFunctionality() {
    if (this.editingFunctionality && this.selectedProject) {
        const index = this.selectedProject.functionalities.findIndex(f => f.id === this.editingFunctionality?.id); 

        if (index > -1) {  
            this.selectedProject.functionalities[index] = this.editingFunctionalityBackup;
        }

        this.editingFunctionality = null;
    }
}

updateFunctionalityStatus(functionality: Functionality): void {
  if (!functionality.tasks || functionality.tasks.length === 0) {
      return;
  }

  let highestPriorityStatus = this.statusHierarchy[this.statusHierarchy.length - 1];

  for (let task of functionality.tasks) {
      const taskStatusPriority = this.statusHierarchy.indexOf(task.status);
      const highestStatusPriority = this.statusHierarchy.indexOf(highestPriorityStatus);

      if (taskStatusPriority < highestStatusPriority) {
          highestPriorityStatus = task.status;
      }
  }

  functionality.status = highestPriorityStatus;
}

  startEditingTask(task: Task) {
    this.editingTask = task;
    this.editingTaskBackup = { ...task };
  }

  saveEditedTask() {
    if (this.editingTask && this.selectedProject) {
        for (const functionality of this.selectedProject.functionalities) {
            const index = functionality.tasks.findIndex(t => t.id === this.editingTask?.id);
            if (index !== -1) {
                functionality.tasks[index] = this.editingTaskBackup;
                this.updateFunctionalityStatus(functionality);  // aktualizacja statusu funkcjonalności
                this.editingTask = null;
                break;
            }
        }
    }
}

  cancelEditingTask() {
    if (this.editingTask && this.selectedProject) {
      for (const functionality of this.selectedProject.functionalities) {
        const index = functionality.tasks.findIndex(t => t.id === this.editingTask?.id);
        if (index !== -1) {
          functionality.tasks[index] = this.editingTaskBackup;
          this.editingTask = null;
          break;
        }
      }
    }
  }
}
