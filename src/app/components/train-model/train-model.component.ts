import { Component, Input, OnInit } from '@angular/core';
import { visionCategoryModel } from 'src/app/common/models/model-category.model';
import { FirestoreCommonsService } from 'src/app/services/firestore-commons.service';

import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-train-model',
  templateUrl: './train-model.component.html',
  styleUrls: ['./train-model.component.scss']
})
export class TrainModelComponent implements OnInit {

  epocs = 5;
  batchSize = 16;
  learningRate = 0.001;
  projectCategories: visionCategoryModel[] = [];

  constructor(
    private fcs: FirestoreCommonsService,
  ) { }

  @Input() projectID: string;

  ngOnInit(): void {
    this.getProjectCategories();
  }

  getProjectCategories() {
    this.fcs.colWithIds$(`projects/${this.projectID}/categories`, ref=>ref.orderBy('createdAt', 'asc'))
      .subscribe((categories: visionCategoryModel[]) => {
        this.projectCategories = categories.filter(category => category.enable !== false);
      });
  }

  trainModel() {

    const tensorsImage = [];

    this.projectCategories.forEach(category => {
      category.pics.forEach(async pic => {
        const tensorImg = await this.convertBase64ToTensor(pic);
        console.log(tensorImg);
      });
    });
  }

  convertBase64ToTensor(base64str): Promise<any> {

    return new Promise((resolve, reject) => {

      try {
        const buffer = atob(base64str);
        let byteNumbers = new Array(buffer.length);

        for (let i = 0; i < buffer.length; i++) {
            byteNumbers[i] = buffer.charCodeAt(i);
        }

        resolve(tf.tensor(byteNumbers))

      } catch (error) {
        reject(error)
      }

    })
  }

}
