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
  name = '';
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
      this.categoryService.update(this.selectedId, { name: this.name }).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    } else {
      this.categoryService.create({ name: this.name }).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    }
  }

  edit(category: Category) {
    this.editMode = true;
    this.selectedId = category.id;
    this.name = category.name;
  }

  delete(id: number) {
    if (confirm('Supprimer cette catégorie ?')) {
      this.categoryService.delete(id).subscribe(() => this.loadCategories());
    }
  }

  resetForm() {
    this.name = '';
    this.editMode = false;
    this.selectedId = null;
  }
}
