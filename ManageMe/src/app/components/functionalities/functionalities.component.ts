import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Functionality } from '../../models/functionality.model';
import { FunctionalityService } from '../../services/functionality.service';

@Component({
  selector: 'app-functionalities',
  templateUrl: './functionalities.component.html',
  styleUrls: ['./functionalities.component.css']
})
export class FunctionalitiesComponent implements OnInit {
  functionalities: Functionality[] = [];
  projectId: number | null = null;

  constructor(
    private functionalityService: FunctionalityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectIdStr = params.get('projectId');
      if (projectIdStr) {
        this.projectId = parseInt(projectIdStr, 10);
        this.loadFunctionalitiesForProject(this.projectId);
      }
    });
  }

  loadFunctionalitiesForProject(projectId: number): void {
    this.functionalities = this.functionalityService.getFunctionalities().filter(f => f.projectId === projectId);
  }
  newFunctionality: Functionality = {
    id: 0,
    projectId: 0,
    name: '',
    description: '',
    tasks: [],
    status: 'ToDo'
  };
  
  
  addFunctionality(): void {
    if (this.newFunctionality.name.trim()) {
      this.newFunctionality.id = Date.now();
      this.newFunctionality.projectId = this.projectId!;
      this.functionalityService.addFunctionality({ ...this.newFunctionality });
      this.newFunctionality.name = '';
      this.newFunctionality.description = '';
      this.loadFunctionalitiesForProject(this.projectId!);
    }
  }
  
  
  deleteFunctionality(id: number): void {
    this.functionalityService.deleteFunctionality(id);
    this.loadFunctionalitiesForProject(this.projectId!);
  }
  
}
