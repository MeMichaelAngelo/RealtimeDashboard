import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskInterface } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class MainService {
  private api = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get<TaskInterface[]>(this.api);
  }

  getSingleTask(id: string) {
    return this.http.get<TaskInterface>(`${this.api}/${id}`);
  }

  createNewTask(newTask: TaskInterface) {
    return this.http.post<TaskInterface>(this.api, newTask);
  }

  //   updateProgress(id: string, progress: number) {
  //     return this.http.patch(`${this.api}/${id}/progress`, { progress });
  //   }

  deleteTask(id: string) {
    return this.http.delete<TaskInterface>(`${this.api}/${id}`);
  }
}
