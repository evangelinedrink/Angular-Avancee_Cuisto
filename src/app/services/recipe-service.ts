import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Author, Recipe, RecipePage } from '@cuisto/models';
import { API_URL } from './api';

@Service()
export class RecipeService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<RecipePage> {
    return this.http.get<RecipePage>(`${API_URL}/recipes?limit=0`);
  }

  search(terme: string): Observable<RecipePage> {
    return this.http.get<RecipePage>(`${API_URL}/recipes/search?q=${encodeURIComponent(terme)}`);
  }

  getById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${API_URL}/recipes/${id}`);
  }

  byTag(tag: string): Observable<RecipePage> {
    return this.http.get<RecipePage>(`${API_URL}/recipes/tag/${encodeURIComponent(tag)}`);
  }

  author(id: number): Observable<Author> {
    return this.http.get<Author>(`${API_URL}/users/${id}?select=firstName,lastName`);
  }

  add(recette: object): Observable<Recipe> {
    return this.http.post<Recipe>(`${API_URL}/recipes/add`, recette);
  }
}
