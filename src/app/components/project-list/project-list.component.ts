import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { projectModel } from '../../common/models/project.model';
import { ProjectFacade } from '../../common/facades/project.facade';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList$: Observable<projectModel[]> = this.projectFacade.projects$;

  constructor(
    private projectFacade: ProjectFacade
  ) { }

  ngOnInit(): void {
    this.projectFacade.loadProjects();
  }

  selectProject(project: projectModel): void {
    this.projectFacade.selectProject(project);
  }

}
