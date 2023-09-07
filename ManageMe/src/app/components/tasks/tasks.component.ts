import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  functionalityId: number | null = null;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const functionalityIdStr = params.get('functionalityId');
      if (functionalityIdStr) {
        this.functionalityId = parseInt(functionalityIdStr, 10);
        this.loadTasksForFunctionality(this.functionalityId);
      }
    });
  }

  loadTasksForFunctionality(functionalityId: number): void {
    this.tasks = this.taskService.getTasks().filter(t => t.functionalityId === functionalityId);
  }
  newTask: Task = {
    id: 0,
    functionalityId: this.functionalityId!,
    name: '',
    status: 'todo'
  };
  
  addTask(): void {
    if (this.newTask.name.trim()) {
      this.newTask.id = Date.now();
      this.taskService.addTask({ ...this.newTask });
      this.newTask.name = '';
      this.loadTasksForFunctionality(this.functionalityId!);
    }
  }
  
  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasksForFunctionality(this.functionalityId!);
  }
  
  changeStatus(task: Task, newStatus: 'todo' | 'doing' | 'done'): void {
    task.status = newStatus;
    this.taskService.updateTask(task);
  }
  
}
