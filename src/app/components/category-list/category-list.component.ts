import { Component, Input, OnInit } from '@angular/core';
import { ProjectFacade } from 'src/app/common/facades/project.facade';
import { visionCategoryModel } from 'src/app/common/models/model-category.model';
import { projectModel } from 'src/app/common/models/project.model';
import { FirestoreCommonsService } from 'src/app/services/firestore-commons.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  projectItem: projectModel;
  projectCategories: visionCategoryModel[] = [];

  constructor(
    private fcs: FirestoreCommonsService,
    private projectFacade: ProjectFacade,
  ) { }

  @Input() projectID: string;

  ngOnInit(): void {
    this.getProjectInfo();
  }

  getProjectInfo() {
    this.fcs.doc$(`projects/${this.projectID}`).subscribe((project: projectModel) => {
      this.projectFacade.selectProject(project);
      this.projectItem = project;
      this.getProjectCategories();
    });
  }

  getProjectCategories() {
    this.fcs.colWithIds$(`projects/${this.projectID}/categories`, ref=>ref.orderBy('createdAt', 'asc'))
      .subscribe((categories: visionCategoryModel[]) => {
        this.projectCategories = categories;
      });
  }

  addVisionCategory(): void {

    const newCategory: visionCategoryModel = {
      name: `Categoria ${this.projectCategories.length + 1}`,
      pics: []
    }

    this.fcs.add(`projects/${this.projectID}/categories`, newCategory);
  }

}
