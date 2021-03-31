import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { visionCategoryModel } from 'src/app/common/models/model-category.model';
import { FirestoreCommonsService } from 'src/app/services/firestore-commons.service';

@Component({
  selector: 'app-train-review',
  templateUrl: './train-review.component.html',
  styleUrls: ['./train-review.component.scss']
})
export class TrainReviewComponent implements OnInit {

  projectCategories: visionCategoryModel[] = [];

  constructor(
    private fcs: FirestoreCommonsService,
  ) { }

  @Input() projectID: string;
  @ViewChild('webcam') webcamElement: ElementRef;
  webcam: any;

  ngOnInit(): void {
    this.getProjectCategories();
  }

  async ngAfterViewInit() {
     this.webcam = await tf.data.webcam(this.webcamElement.nativeElement);
  }

  getProjectCategories() {
    this.fcs.colWithIds$(`projects/${this.projectID}/categories`, ref=>ref.orderBy('createdAt', 'asc'))
      .subscribe((categories: visionCategoryModel[]) => {
        this.projectCategories = categories;
      });
  }

  getRandomColor(): string {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
  }

}
