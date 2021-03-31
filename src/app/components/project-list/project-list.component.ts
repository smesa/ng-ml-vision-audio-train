import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { projectModel } from '../../common/models/project.model';
import { ProjectFacade } from '../../common/facades/project.facade';
import { Router } from '@angular/router';
import { FirestoreCommonsService } from 'src/app/services/firestore-commons.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList$: Observable<projectModel[]> = this.projectFacade.projects$;

  constructor(
    private projectFacade: ProjectFacade,
    private fcs: FirestoreCommonsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.projectFacade.loadProjects();
  }

  selectProject(project: projectModel): void {
    this.projectFacade.selectProject(project);
    this.route.navigate(['/projects/train', project.id]);
  }

  deleteProject(item): void {
    this.fcs.delete(`projects/${item.id}`);
  }

}
