import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
  newProject: Project = {
    id: 0,
    name: '',
    description: '',
    owner: 'Jan Kowalski'
  };
  
  
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
  deleteProject(project: Project): void {
    const index = this.projects.indexOf(project);
    if (index > -1) {
        this.projects.splice(index, 1);
    }
}
  isEditing: boolean = false;
  editingProject: Project = { id: 0, name: '', description: '', owner: '' };

  editProject(project: Project): void {
    this.isEditing = true;
    this.editingProject = { ...project }; // kopiujemy projekt, aby nie edytować bezpośrednio oryginalnego obiektu
}
saveProject(): void {
  const index = this.projects.findIndex(p => p.id === this.editingProject.id);
  if (index > -1) {
      this.projects[index] = this.editingProject;
  }
  this.isEditing = false;
}



  
}
