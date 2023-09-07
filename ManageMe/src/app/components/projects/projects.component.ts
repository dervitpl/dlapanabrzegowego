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
    description: ''
  };
  
  addProject(): void {
    if (this.newProject.name.trim()) {
      this.newProject.id = Date.now(); // Dajemy unikatowe ID na podstawie aktualnego czasu.
      this.projectService.addProject({ ...this.newProject });
      this.newProject.name = '';
      this.newProject.description = '';
      this.loadProjects();
    }
  }
  
  loadProjects(): void {
    this.projects = this.projectService.getProjects();
  }
  deleteProject(id: number): void {
    this.projectService.deleteProject(id);
    this.loadProjects();
  }
  
}
