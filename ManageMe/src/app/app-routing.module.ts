import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { FunctionalitiesComponent } from './components/functionalities/functionalities.component';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:projectId/functionalities', component: FunctionalitiesComponent },
  { path: 'functionalities/:functionalityId/tasks', component: TasksComponent },
  {
    path: 'functionalities/:projectId',
    component: FunctionalitiesComponent
  },
  {
    path: 'tasks/:projectId',
    component: TasksComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
