import { Component, OnInit } from '@angular/core';
import { ProjectFacade } from '../../../common/facades/project.facade';
import { projectModel } from 'src/app/common/models/project.model';
import { FirestoreCommonsService } from '../../../services/firestore-commons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { visionCategoryModel } from 'src/app/common/models/model-category.model';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {

  projectID: string;
  projectItem: projectModel;
  projectCategories: visionCategoryModel[] = [];

  constructor(
    private projectFacade: ProjectFacade,
    private fcs: FirestoreCommonsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getParameterId();
  }

  ngOnInit(): void {
     this.getProjectInfo();
  }

  getParameterId() {
    this.route.params.subscribe(params => {
      this.projectID = params.id;
      if (!this.projectID) {
        this.router.navigate(['/projects']);
      }
    })
  }

  getProjectInfo() {
    this.fcs.doc$(`projects/${this.projectID}`).subscribe((project: projectModel) => {
      this.projectFacade.selectProject(project);
      this.projectItem = project;
      this.getProjectCategories();
    });
  }

  getProjectCategories() {
    this.fcs.colWithIds$(`projects/${this.projectID}/categories`)
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

  changeValueName(name, item) {
    delete item.edit;
    this.fcs.update(`projects/${this.projectID}/categories/${item.id}`,{
      name
    });
  }

  async takePicture(item: visionCategoryModel) {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    var imageBase64 = image.base64String;

    if (!item.pics) {
      item.pics = [];
    } else {
      item.pics = [...item.pics, imageBase64];
    }

    this.fcs.update(`projects/${this.projectID}/categories/${item.id}`,{
      pics: item.pics
    });

  }

  deletePic(item, index) {
    item.pics.splice(index, 1);
    this.fcs.update(`projects/${this.projectID}/categories/${item.id}`,{
      pics: item.pics
    });
  }

}
