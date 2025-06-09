import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task-serv';
import { CategoryService, Category } from '../../services/category-serv';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BreadcrumbComponent],
  templateUrl: './task.html',
  styleUrls: ['./task.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];

  title = '';
  description = '';
  selectedCategoryId: number | null = null;

  editMode = false;
  selectedTaskId: number | null = null;

  constructor(
    private taskService: TaskService, 
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.extractCategoryIdFromUrl();
  }

  extractCategoryIdFromUrl() {
    this.route.params.subscribe(params => {
      const categoryId = +params['categoryId'];
      if (categoryId) {
        this.selectedCategoryId = categoryId;
      }
    this.loadCategories();
    this.loadTasks();
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }
  
  loadTasks() {
    if (this.selectedCategoryId) {
      this.taskService.getAll(this.selectedCategoryId!).subscribe(tasks => this.tasks = tasks);
      console.log(`tasks: ${this.tasks}`)
    } else {
      // this.taskService.getAll().subscribe(tasks => this.tasks = tasks);
    }
  }

  save() {
    if (!this.selectedCategoryId) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }

    if (this.editMode && this.selectedTaskId !== null) {
      this.taskService.update(this.selectedTaskId, {
        title: this.title,
        description: this.description,
        categoryId: this.selectedCategoryId
      }).subscribe(() => {
        this.resetForm();
        this.loadTasks();
      });
    } else {
      this.taskService.create({
        title: this.title,
        description: this.description,
        categoryId: this.selectedCategoryId
      }).subscribe(() => {
        this.resetForm();
        this.loadTasks();
      });
    }
  }

  edit(task: Task) {
    this.editMode = true;
    this.selectedTaskId = task.id;
    this.title = task.title;
    this.description = task.description;
    this.selectedCategoryId = task.categoryId;
  }

  delete(id: number, categoryId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      this.taskService.delete(id, categoryId).subscribe(() => this.loadTasks());
    }
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.selectedCategoryId = null;
    this.editMode = false;
    this.selectedTaskId = null;
  }

  onCategoryChange() {
    this.loadTasks();
  }

  // getCategoryTitle(categoryId: number): string {
  getCategoryTitle$(categoryId: number): Observable<string> {
    return this.categoryService.getById(categoryId).pipe(
      map(category => category.title || 'N/A'),
      catchError(() => of('N/A')) 
    );
  }


}
