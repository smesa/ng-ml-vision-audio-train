import { Component, Input, OnInit } from '@angular/core';
import { visionCategoryModel } from 'src/app/common/models/model-category.model';
import { FirestoreCommonsService } from 'src/app/services/firestore-commons.service';
import { CameraResultType, Plugins } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {

  constructor(
    private fcs: FirestoreCommonsService,
  ) { }

  @Input() categoryItem: visionCategoryModel;
  @Input() projectID: string;

  ngOnInit(): void {
  }

  changeValueName(name) {
    delete this.categoryItem.edit;
    this.fcs.update(`projects/${this.projectID}/categories/${this.categoryItem.id}`,{
      name
    });
  }

  async takePicture() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    const imageBase64 = image.base64String;

    if (!this.categoryItem.pics) {
      this.categoryItem.pics = [];
    } else {
      this.categoryItem.pics = [...this.categoryItem.pics, imageBase64];
    }

    this.fcs.update(`projects/${this.projectID}/categories/${this.categoryItem.id}`,{
      pics: this.categoryItem.pics
    });

  }

  saveChangesPics(): void {
    this.fcs.update(`projects/${this.projectID}/categories/${this.categoryItem.id}`,{
      pics: this.categoryItem.pics
    });
  }

  deletePic(index) {
    this.categoryItem.pics.splice(index, 1);
    this.saveChangesPics();
  }

  deleteAllPics(): void {
    this.categoryItem.pics = [];
    this.saveChangesPics();
  }

  deleteCategory():void {
    this.fcs.delete(`projects/${this.projectID}/categories/${this.categoryItem.id}`);
  }

  changeStatusEnableCategory(status:boolean): void {
    this.fcs.update(`projects/${this.projectID}/categories/${this.categoryItem.id}`, {
      enable: status
    });
  }


}
