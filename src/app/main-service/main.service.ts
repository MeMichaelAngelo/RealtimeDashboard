import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { TaskInterface } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class MainService {
  private api = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(this.api);
  }

  getSingleTask(id: string): Observable<TaskInterface> {
    return this.http.get<TaskInterface>(`${this.api}/${id}`);
  }

  createNewTask(newTask: TaskInterface): Observable<TaskInterface> {
    return this.http.post<TaskInterface>(this.api, newTask);
  }

  updateTask(id: string, task: TaskInterface): Observable<TaskInterface> {
    return this.http.put<TaskInterface>(`${this.api}/${id}/task`, task);
  }

  deleteTask(id: string): Observable<TaskInterface> {
    return this.http.delete<TaskInterface>(`${this.api}/${id}`);
  }
}
