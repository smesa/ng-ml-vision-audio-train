import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState, projectsFeatureKey } from './projects.reducer';

const projectsFeatureSelector = createFeatureSelector<ProjectState>(projectsFeatureKey);

const projects = createSelector(
  projectsFeatureSelector,
  (state: ProjectState) => state.projects
)

const projectSelected = createSelector(
  projectsFeatureSelector,
  (state: ProjectState) => state.projectSelected
)

const loading = createSelector(
  projectsFeatureSelector,
  (state: ProjectState) => state.loading
)

const errors = createSelector(
  projectsFeatureSelector,
  (state: ProjectState) => state.error
)

export const projectsQuery = {
  projects,
  projectSelected,
  loading,
  errors
}
