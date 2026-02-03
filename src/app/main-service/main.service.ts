import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectInterface } from '../interfaces/project.interface';

@Injectable({ providedIn: 'root' })
export class MainService {
  private api = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<ProjectInterface[]>(this.api);
  }

  getSingleProject(id: string) {
    return this.http.get<ProjectInterface>(`${this.api}/${id}`);
  }

  createNewProject(newProject: ProjectInterface) {
    return this.http.post<ProjectInterface>(this.api, newProject);
  }

  //   updateProgress(id: string, progress: number) {
  //     return this.http.patch(`${this.api}/${id}/progress`, { progress });
  //   }

  deleteProject(id: string) {
    return this.http.delete<ProjectInterface>(`${this.api}/${id}`);
  }
}
