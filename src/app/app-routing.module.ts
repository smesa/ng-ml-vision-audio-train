import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TrainComponent } from './pages/projects/train/train.component';

const extraOptions: ExtraOptions = {
  useHash: true
}

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'projects/train/:id',
    component: TrainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
