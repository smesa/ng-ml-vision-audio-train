import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { projectModel } from 'src/app/common/models/project.model';
import { FirestoreCommonsService } from '../../services/firestore-commons.service';
declare var UIkit: any;

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

  createProjectForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  })

  constructor(
    private fcs: FirestoreCommonsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  openModalCreateProject() {
    UIkit.modal('#modal-select-type').show();
  }

  selectType(type) {
    this.createProjectForm.controls.type.setValue(type);
  }

  async createProject() {


    const { name, description, type } = this.createProjectForm.value;
    const projectInfo: projectModel = {
      name,
      description,
      type
    };

    try {
      await this.fcs.add('projects', projectInfo);
      this.closeModal();
    } catch (error) {
      console.error(error);
    }

  }

  closeModal() {
    UIkit.modal('#modal-select-type').hide();
  }

}
