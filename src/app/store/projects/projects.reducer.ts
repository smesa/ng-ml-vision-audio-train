import { createReducer, on } from '@ngrx/store';
import { projectModel } from 'src/app/common/models/project.model';
import { errorModel } from '../../common/models/error.model';
import * as actions from './projects.actions';

export const projectsFeatureKey = 'projects';

export interface ProjectState {
  projects: projectModel[]
  projectSelected: projectModel,
  loading: boolean
  error: errorModel
}

export const initialState: ProjectState = {
  projects: null,
  projectSelected: null,
  loading: false,
  error: null
};


const reducer = createReducer(
  initialState,
  on(actions.loadProjects, state => ({ ...state, loading: true })),
  on(actions.loadProjectsSuccess, (state, { data }) => ({
    ...state,
    projects: data,
    loading: false,
    error: null
  })),
  on(actions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    project: null,
    loading: false,
    error: {...error}
  })),
  on(actions.selectProject, (state, { data }) => ({
    ...state,
    projectSelected: data
  }))

)

export function projectReducer(state, action) {
  return reducer(state, action);
}

