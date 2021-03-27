import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as actions from './projects.actions'
import { FirestoreCommonsService } from '../../services/firestore-commons.service';
import { of } from 'rxjs';


@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private fcs:FirestoreCommonsService
  ) { }

  loadProjects$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.loadProjects),
      mergeMap(
        () => this.fcs.colWithIds$('projects').pipe(
          map((projects => actions.loadProjectsSuccess({ data: projects }))),
          catchError(error=>of(actions.loadProjectsFailure({error})))
        )
      )
    )
  )

}
