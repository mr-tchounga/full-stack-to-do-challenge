import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../../services/category-serv';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BreadcrumbComponent], 
  templateUrl: './category.html',
  styleUrls: ['./category.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  title = ''; 
  editMode = false;
  selectedId: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }
  selectCategory(category: Category) {
    this.selectedId = category.id;
    this.router.navigate([`/categories/${category.id}/tasks`]);
  }

  save() {
    if (this.editMode && this.selectedId !== null) {
      this.categoryService.update(this.selectedId, { title: this.title }).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    } else {
      this.categoryService.create({ title: this.title }).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    }
  }

  edit(category: Category) {
    this.editMode = true;
    this.selectedId = category.id;
    this.title = category.title; 
  }

  delete(id: number) {
    if (confirm('Supprimer cette catégorie ?')) {
      this.categoryService.delete(id).subscribe(() => this.loadCategories());
    }
  }

  resetForm() {
    this.title = '';
    this.editMode = false;
    this.selectedId = null;
  }
}
