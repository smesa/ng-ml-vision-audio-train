import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import * as actions from '../../store/projects/projects.actions';
import { projectsQuery } from '../../store/projects/projects.selectors';
import { projectModel } from '../models/project.model';


@Injectable()
export class ProjectFacade {

  projects$ = this.store.select(projectsQuery.projects);
  selectProject$ = this.store.select(projectsQuery.projectSelected);
  loading$ = this.store.select(projectsQuery.loading);
  error$ = this.store.select(projectsQuery.errors);

  constructor(
    private store: Store<AppState>
  ) {}

  loadProjects(): void {
    this.store.dispatch(actions.loadProjects());
  }

  selectProject(project: projectModel): void {
    this.store.dispatch(actions.selectProject({ data: project }));
  }

}
