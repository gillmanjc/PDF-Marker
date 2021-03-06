import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {AlertService} from "@coreModule/services/alert.service";
import {AppService} from "@coreModule/services/app.service";
import {Mapping} from "@coreModule/utils/mapping.class";
import {IRubric, Rubric, RubricCriteria, RubricCriteriaLevels} from "@coreModule/utils/rubric.class";

interface IRubricDatasource {

  name: string;

  inUse?: boolean
}

@Component({
  selector: 'pdf-marker-rubric-import',
  templateUrl: './rubric-import.component.html',
  styleUrls: ['./rubric-import.component.scss']
})
export class RubricImportComponent implements OnInit {

  readonly acceptMimeType = "application/json";
  readonly displayedColumns: string[] = ['title', 'actions', 'inUse'];
  private isLoading$ = this.appService.isLoading$;
  private file: File;

  rubricForm: FormGroup;
  dataSource: MatTableDataSource<IRubricDatasource> = new MatTableDataSource([{id: 0, name: "Values and Ethics Rubric", inUse: false }, {id: 1, name: "Professional Values", inUse: false}]);
  rubrics: IRubric[];
  validMime: boolean;

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private appService: AppService) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.rubricForm = this.fb.group({
      rubricName: [null, Validators.required],
      rubricFile: [null, Validators.required],
      rubricFileText: [null, Validators.required]
    });
  }

  get fc() {
    return this.rubricForm.controls;
  }

  async onFileChange(event) {
    this.alertService.clear();
    this.resetPreviousUpload();
    console.log(event.target.files[0]);
    if(event.target.files[0] === undefined || event.target.files[0] === null) {
      this.fc.rubricFile.setValue(null);
      this.fc.rubricFileText.setValue(null);
    } else {
      const file: File = await event.target.files[0];
      if(file && file.type === this.acceptMimeType) {

        const reader = new FileReader();

        reader.addEventListener('loadend', (e) => {

          try {
            const json: IRubric = JSON.parse(reader.result.toString()) as IRubric;

            if(Mapping.isTypeOf(json, Rubric)) {
              let isError: boolean = false;
              for(let i = 0; i < json.criterias.length; i++) {
                if(!Mapping.isTypeOf(json.criterias[i], RubricCriteria) || !Mapping.isCollectionTypeOf(json.criterias[i].levels, RubricCriteriaLevels)) {
                  isError  = true;
                  break;
                }
              }

              if(!isError) {
                this.fc.rubricFile.setErrors(null);
                this.fc.rubricFileText.setValue(file.name);
                this.fc.rubricName.setValue(this.getRubricNameFromFilename(file.name));
                this.file = file;
              } else {
                this.setErrorMessage(file, "Invalid rubric!");
              }
            } else {
              this.setErrorMessage(file, "Invalid rubric criteria!");
            }
          } catch (e) {
            this.setErrorMessage(file, "Cannot convert provided file to valid JSON!");
          }
        });

        reader.readAsText(file);

      } else {
        this.setErrorMessage(file, "File must be a valid JSON file!");
      }
    }
    //this..updateValueAndValidity();
  }

  private setErrorMessage(file: File, errorMsg: string) {
    this.alertService.error("File must be a valid JSON file!");
    this.fc.rubricFile.setErrors({file: true});
    this.fc.rubricFileText.setValue(file.name);
    this.fc.rubricName.setValue(null);
  }

  showRubric(index: number) {
    console.log("Show Rubric at index = " + index);
  }

  deleteRubric(index: number) {
    console.log("Delete Rubric at index = " + index);
  }

  private resetPreviousUpload() {
    this.fc.rubricName.setValue(null);
    this.fc.rubricFile.setValue(null);
    this.fc.rubricFileText.setValue(null);
    this.rubricForm.updateValueAndValidity();
  }

  onResetpreviousUpload() {
    this.resetPreviousUpload();
  }

  private getRubricNameFromFilename(filename: string): string {
    return filename.replace(/\.[^/.]+$/, "");
  }

  onSubmit(event) {
    this.alertService.clear();
    if(this.rubricForm.invalid) {
      this.alertService.error("Please fill in the correct details!");
      return;
    }

    let formData: FormData = new FormData();
    formData.append("rubricName", this.fc.rubricName.value);
    formData.append('file', this.file);


    console.log(formData);
  }

}


