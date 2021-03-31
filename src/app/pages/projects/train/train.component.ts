import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import * as tf from '@tensorflow/tfjs';
// import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {

  projectID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getParameterId();
  }

  // async ngAfterViewInit() {
  //   this.webcam = await tf.data.webcam(this.webcamElement.nativeElement);
  // }

  // classify() {
  //   mobilenet.load().then((model:any) => {
  //     model.classify(this.imgClassify).then(predictions => {
  //       console.log('Predictions: ');
  //       console.log(predictions);
  //     });
  //   });
  // }

  // async takeImgClassify() {
  //   this.imgClassify = await this.webcam.capture();
  // }

  getParameterId() {
    this.route.params.subscribe(params => {
      this.projectID = params.id;
      this.returnToProjecsIfNotProjectId();
    })
  }

  returnToProjecsIfNotProjectId(): void {
    if (!this.projectID) {
      this.router.navigate(['/projects']);
    }
  }

}


