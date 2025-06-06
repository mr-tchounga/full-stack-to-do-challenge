import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../../services/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrls: ['./category.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  title = ''; // ← CORRECTION : on utilise 'title' au lieu de 'name'
  editMode = false;
  selectedId: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => this.categories = data);
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
    this.title = category.title; // ← CORRECTION
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
