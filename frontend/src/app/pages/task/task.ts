import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task';
import { CategoryService, Category } from '../../services/category';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private taskService: TaskService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadTasks();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  loadTasks() {
    if (this.selectedCategoryId) {
      this.taskService.getAll(this.selectedCategoryId).subscribe(tasks => this.tasks = tasks);
    } else {
      this.taskService.getAll().subscribe(tasks => this.tasks = tasks);
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

  delete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      this.taskService.delete(id).subscribe(() => this.loadTasks());
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

  getCategoryTitle(categoryId: number): string {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.title : 'N/A';
  }

}
