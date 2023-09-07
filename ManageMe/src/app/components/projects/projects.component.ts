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
  editingProjectID: number | null = null;
  editingProject: Project = { id: 0, name: '', description: '', owner: '' };
  newProject: Project = {
    id: 0,
    name: '',
    description: '',
    owner: 'Jan Kowalski'
  };

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
}
