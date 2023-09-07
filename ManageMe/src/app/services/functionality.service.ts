import { Injectable } from '@angular/core';
import { Functionality } from '../models/functionality.model';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {
  private functionalities: Functionality[] = [
    {
      id: 1,
      projectId: 1,
      name: 'Default Functionality',
      description: 'This is a default functionality',
      tasks: []
    }
  ];

  constructor() {}

  getFunctionalities(): Functionality[] {
    return this.functionalities;
  }

  getFunctionalityById(id: number): Functionality | undefined {
    return this.functionalities.find(f => f.id === id);
  }

  addFunctionality(functionality: Functionality): void {
    this.functionalities.push(functionality);
  }

  deleteFunctionality(id: number): void {
    const index = this.functionalities.findIndex(f => f.id === id);
    if (index !== -1) {
      this.functionalities.splice(index, 1);
    }
  }

  updateFunctionality(updatedFunctionality: Functionality): void {
    const index = this.functionalities.findIndex(f => f.id === updatedFunctionality.id);
    if (index !== -1) {
      this.functionalities[index] = updatedFunctionality;
    }
  }
}
