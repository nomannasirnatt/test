//imports section
// imports angular modules
import { Router, Routes } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, NgForm, AbstractControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageBrowser } from './../../../shared/sdk/storage/storage.browser';

//importing services to be used in this class
import { ApplyingDegreeService } from './../Services/applyingDegree.service';
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//declaring component with component decorator
@Component({
  selector: 'educational-details',
  templateUrl: './educationalDetails.html'
})

//defining and exporting EducationalDetails class
export class EducationalDetails implements OnInit {
    //declaring variables
    public form: FormGroup;
    public sscDegree: AbstractControl;
    public sscBoard: AbstractControl;
    public sscSubject: AbstractControl;
    public otherSscSubject: AbstractControl;
    public sscTotalMarks: AbstractControl;
    public sscObtainedMarks: AbstractControl;
    public hsscResultAwaiting: AbstractControl;
    public hsscRollNumber: AbstractControl;
    public hsscDegree: AbstractControl;
    public hsscBoard: AbstractControl;
    public hsscSubject: AbstractControl;
    public otherHsscSubject: AbstractControl;
    public hsscTotalMarks: AbstractControl;
    public hsscObtainedMarks: AbstractControl;
    public undergraduateResultAwaiting: AbstractControl;
    public undergraduateRollNumber: AbstractControl;
    public undergraduateDegree: AbstractControl;
    public undergraduateUniversity: AbstractControl;
    public undergraduateSubjects: AbstractControl;
    public undergraduateTotalMarks: AbstractControl;
    public undergraduateObtainedMarks: AbstractControl;
    public graduateDegree: AbstractControl;
    public graduateYear: AbstractControl;
    public graduateUniversity: AbstractControl;
    public graduateSubjects: AbstractControl;
    public graduateTotalMarks: AbstractControl;
    public graduateObtainedMarks: AbstractControl;
    public msMphilDegree: AbstractControl;
    public msMphilYear: AbstractControl;
    public msMphilUniversity: AbstractControl;
    public msMphilSubjects: AbstractControl;
    public msMphilTotalMarks: AbstractControl;
    public msMphilObtainedMarks: AbstractControl;
    public msMphilThesis: AbstractControl;
    public applyingDegree: string;
    
    public submitted: boolean = false;

    private boards: any;
    private universities: any;
    private years: any;
    private sscSubjectsArray = ['Art','Science','Other'];
    private sscDegreesArray = ['Metric','O-Level'];
    private hsscDegreesArray = ['FSc','A-Level','DAE','DCom','ICom','Ics','FA'];
    private hsscSubjectArray = ['Pre Engineering','Computer Science','Pre Medical','Arts and Humanities','General Science','Commerce','Other'];
    private undergraduateDegreeArray = ['BA','BSc','BCom','BBA(2 years)'];

    //constructor for EducationDetails class
    constructor(
      private _menuService: BaMenuService,
      fb:FormBuilder,
      private http:Http,
      private localstorage: StorageBrowser,
      private router: Router,
      private applingDegreeService: ApplyingDegreeService,){
        this.form = fb.group ({
            'sscDegree': ['',Validators.required],
            'sscBoard': ['',Validators.required],
            'sscSubject': ['',Validators.required],
            'otherSscSubject': [''],
            'sscTotalMarks': ['',Validators.required],
            'sscObtainedMarks': ['',Validators.required],
            'hsscResultAwaiting': [''],
            'hsscRollNumber': [''],
            'hsscDegree': ['',Validators.required],
            'hsscBoard': ['',Validators.required],
            'hsscSubject': ['',Validators.required],
            'otherHsscSubject': [''],
            'hsscTotalMarks': ['',Validators.required],
            'hsscObtainedMarks': ['',Validators.required],
            'undergraduateResultAwaiting': [''],
            'undergraduateRollNumber': [''],
            'undergraduateDegree': [''],
            'undergraduateUniversity': [''],
            'undergraduateSubjects': [''],
            'undergraduateTotalMarks': [''],
            'undergraduateObtainedMarks': [''],
            'graduateDegree': [''],
            'graduateYear': [''],
            'graduateUniversity': [''],
            'graduateSubjects': [''],
            'graduateTotalMarks': [''],
            'graduateObtainedMarks': [''],
            'msMphilDegree': [''],
            'msMphilYear': [''],
            'msMphilUniversity': [''],
            'msMphilSubjects': [''],
            'msMphilTotalMarks': [''],
            'msMphilObtainedMarks': [''],
            'msMphilThesis': ['']
        });
        // assigning form control values to abstract control variables
        this.sscDegree = this.form.controls['sscDegree'];
        this.sscBoard = this.form.controls['sscBoard'];
        this.sscSubject = this.form.controls['sscSubject'];
        this.otherSscSubject = this.form.controls['otherSscSubject'];
        this.sscTotalMarks = this.form.controls['sscTotalMarks'];
        this.sscObtainedMarks = this.form.controls['sscObtainedMarks'];
        this.hsscResultAwaiting = this.form.controls['hsscResultAwaiting'];
        this.hsscRollNumber = this.form.controls['hsscRollNumber'];
        this.hsscDegree = this.form.controls['hsscDegree'];
        this.hsscBoard = this.form.controls['hsscBoard'];
        this.hsscSubject = this.form.controls['hsscSubject'];
        this.otherHsscSubject = this.form.controls['otherHsscSubject'];
        this.hsscTotalMarks = this.form.controls['hsscTotalMarks'];
        this.hsscObtainedMarks = this.form.controls['hsscObtainedMarks'];
        this.undergraduateResultAwaiting = this.form.controls['undergraduateResultAwaiting'];
        this.undergraduateRollNumber = this.form.controls['undergraduateRollNumber'];
        this.undergraduateDegree = this.form.controls['undergraduateDegree'];
        this.undergraduateUniversity = this.form.controls['undergraduateUniversity'];
        this.undergraduateSubjects= this.form.controls['undergraduateSubjects'];
        this.undergraduateTotalMarks = this.form.controls['undergraduateTotalMarks'];
        this.undergraduateObtainedMarks = this.form.controls['undergraduateObtainedMarks'];
        this.graduateDegree = this.form.controls['graduateDegree'];
        this.graduateYear = this.form.controls['graduateYear'];
        this.graduateUniversity = this.form.controls['graduateUniversity'];
        this.graduateSubjects = this.form.controls['graduateSubjects'];
        this.graduateTotalMarks = this.form.controls['graduateTotalMarks'];
        this.graduateObtainedMarks = this.form.controls['graduateObtainedMarks'];
        this.msMphilDegree = this.form.controls['msMphilDegree'];
        this.msMphilYear = this.form.controls['msMphilYear'];
        this.msMphilUniversity = this.form.controls['msMphilUniversity'];
        this.msMphilSubjects = this.form.controls['msMphilSubjects'];
        this.msMphilTotalMarks = this.form.controls['msMphilTotalMarks'];
        this.msMphilObtainedMarks = this.form.controls['msMphilObtainedMarks'];
        this.msMphilThesis = this.form.controls['msMphilThesis'];
    }

    //method to set validator to paricular degree 
    private setValidatorMsPhd(dg: string){
      this.form.get(dg+'Degree').setValidators(Validators.required);
      this.form.get(dg+'Year').setValidators(Validators.required);
      this.form.get(dg+'University').setValidators(Validators.required);
      this.form.get(dg+'Subjects').setValidators(Validators.required);
      this.form.get(dg+'TotalMarks').setValidators(Validators.required);
      this.form.get(dg+'ObtainedMarks').setValidators(Validators.required);
      if(dg === 'msMphil'){
        this.form.get(dg+'Thesis').setValidators(Validators.requiredTrue);
      }
    }

    //method to set validators for hssc-2 and hssc-1 result if result awaiting
    onChange(checked){
      if(checked){
        this.form.get('hsscRollNumber').setValidators(Validators.required);
      }
      else{
        this.form.get('hsscRollNumber').setValidators(null);
      }
      this.form.get('hsscRollNumber').updateValueAndValidity();
    }

    //if subject's value is Other than setting validator on other subject field
    sscSubjectChange(subject){
      this.subjectChange('otherSscSubject', subject);
    }

    hsscSubjectChange(subject){
      this.subjectChange('otherHsscSubject', subject);
    }

    private subjectChange(degree: string, subject: any){
      if(subject === 'Other'){
        this.form.get(degree).setValidators(Validators.required);
      }
       else {
        this.form.get(degree).setValidators(null);
      }
      this.form.get(degree).updateValueAndValidity();       
    }

    //defining getBoards method for getting data from json file at specified location which contains educational boards
    public getBoards(){
      return this.http.get('/assets/countries-cities/boards-pak.json')
      .map((res: any) => res.json());
    }

    //defining getUniversities() method for getting data from json file at specified location which contains Universities List
    public getUniversities(){
      return this.http.get('/assets/countries-cities/universities-pak.json')
      .map((res:any) => res.json());
    }

    //defining getYears() method for getting data from json file at specified location which contains list of years
    public getYears(){
      return this.http.get('/assets/countries-cities/years.json')
      .map((res: any) => res.json());
    }
    private sameBodyContent(){
      var body = {
        'sscDegree': this.sscDegree.value,
        'sscBoard': this.sscBoard.value,
        'sscSubject': this.sscSubject.value,
        'otherSscSubject': this.otherSscSubject.value,
        'sscTotalMarks': this.sscTotalMarks.value,
        'sscObtainedMarks': this.sscObtainedMarks.value,
        'hsscResultAwaiting': this.hsscResultAwaiting.value,
        'hsscRollNumber': this.hsscRollNumber.value,
        'hsscDegree': this.hsscDegree.value,
        'hsscBoard': this.hsscBoard.value,
        'hsscSubject': this.hsscSubject.value,
        'otherHsscSubject': this.otherHsscSubject.value,
        'hsscTotalMarks': this.hsscTotalMarks.value,
        'hsscObtainedMarks':this.hsscObtainedMarks.value,
        'undergraduateResultAwaiting': this.undergraduateResultAwaiting.value,
        'undergraduateRollNumber': this.undergraduateRollNumber.value,
        'undergraduateDegree': this.undergraduateDegree.value,
        'undergraduateUniversity': this.undergraduateUniversity.value,
        'undergraduateSubjects': this.undergraduateSubjects.value,
        'undergraduateTotalMarks': this.undergraduateTotalMarks.value,
        'undergraduateObtainedMarks': this.undergraduateObtainedMarks.value,
        'graduateDegree': null,
        'graduateYear': null,
        'graduateUniversity': null,
        'graduateSubjects': null,
        'graduateTotalMarks': null,
        'graduateObtainedMarks': null,
        'msMphilDegree': null,
        'msMphilYear': null,
        'msMphilUniversity': null,
        'msMphilSubjects': null,
        'msMphilTotalMarks': null,
        'msMphilObtainedMarks': null,
        'msMphilThesis': null
      }
      return body;
    }

    private restoreEducationalDetails(body:any){
        this.sscDegree.setValue(body.sscDegree);
        this.sscBoard.setValue(body.sscBoard);
        this.sscTotalMarks.setValue(body.sscTotalMarks);
        this.sscObtainedMarks.setValue(body.sscObtainedMarks);
        this.sscSubject.setValue(body.sscSubject);
        if(body.sscSubject === 'Other'){
          this.otherSscSubject.setValue(body.otherSscSubject);
        }
        this.hsscResultAwaiting.setValue(body.hsscResultAwaiting);
        if(body.hsscResultAwaiting === true){
          this.hsscRollNumber.setValue(body.hsscRollNumber);
        }
        this.hsscDegree.setValue(body.hsscDegree);
        this.hsscBoard.setValue(body.hsscBoard);
        this.hsscSubject.setValue(body.hsscSubject);
        this.hsscTotalMarks.setValue(body.hsscTotalMarks);
        this.hsscObtainedMarks.setValue(body.hsscObtainedMarks);
        if(body.hsscSubject === 'Other'){
          this.otherHsscSubject.setValue(body.otherHsscSubject);
        }
        this.undergraduateResultAwaiting.setValue(body.undergraduateResultAwaiting);
        if(body.undergraduateResultAwaiting === true){
          this.undergraduateRollNumber.setValue(body.undergraduateRollNumber);
        }
        this.undergraduateDegree.setValue(body.undergraduateDegree);
        this.undergraduateUniversity.setValue(body.undergraduateUniversity);
        this.undergraduateSubjects.setValue(body.undergraduateSubjects);
        this.undergraduateTotalMarks.setValue(body.undergraduateTotalMarks);
        this.undergraduateObtainedMarks.setValue(body.undergraduateObtainedMarks);

        if(this.applyingDegree === 'Graduate'){
          this.graduateDegree.setValue(body.graduateDegree);
          this.graduateYear.setValue(body.graduateYear);
          this.graduateUniversity.setValue(body.graduateUniversity);
          this.graduateSubjects.setValue(body.graduateSubjects);
          this.graduateTotalMarks.setValue(body.graduateTotalMarks);
          this.graduateObtainedMarks.setValue(body.graduateObtainedMarks);
        }
        else if(this.applyingDegree === 'PHD'){
          this.graduateDegree.setValue(body.graduateDegree);
          this.graduateYear.setValue(body.graduateYear);
          this.graduateUniversity.setValue(body.graduateUniversity);
          this.graduateSubjects.setValue(body.graduateSubjects);
          this.graduateTotalMarks.setValue(body.graduateTotalMarks);
          this.graduateObtainedMarks.setValue(body.graduateObtainedMarks);
          this.msMphilDegree.setValue(body.msMphilDegree);
          this.msMphilYear.setValue(body.msMphilYear);
          this.msMphilUniversity.setValue(body.msMphilUniversity);
          this.msMphilSubjects.setValue(body.msMphilSubjects);
          this.msMphilTotalMarks.setValue(body.msMphilTotalMarks);
          this.msMphilObtainedMarks.setValue(body.msMphilObtainedMarks);
          this.msMphilThesis.setValue(body.msMphilThesis);
        }
    }

    // ngOnInit hook for some functionality to be inserted before form is loaded
    ngOnInit(): void{
      // getting applying degree from personal details component through applyingDegree.service
      this.applingDegreeService.applyingDegree$.subscribe(applyingDegree => this.applyingDegree = applyingDegree);
      if(this.applyingDegree === 'Graduate' || this.applyingDegree === 'PHD'){
        this.setValidatorMsPhd('graduate');
      }
      if(this.applyingDegree === 'PHD'){
        this.setValidatorMsPhd('msMphil');
      }

      //using getBoards() method which contains educational boards' name to assign data to array
      this.getBoards()
      .subscribe((data) => {
        this.boards = data;
      }, (error) => {
        console.log('Unable to load some data'+ error);
      });

      //using getUniversities() method which contains universities' name to assign data to array
      this.getUniversities()
      .subscribe((data) => {
        this.universities = data;
      }, (error) => {
        console.log('unable to load some data' + error);
      });

      //using getYears() method which contains list of years to assign data to array
      this.getYears()
      .subscribe((data) => {
        this.years = data;
      },(error) => {
        console.log('Unable to load some data' + error);
        
      })

      if(this.localstorage.get('ed') !== null){
        console.log(this.localstorage.get('ed'));
        
        this.restoreEducationalDetails(this.localstorage.get('ed'));
        // this.restorePersonalDetails(this.localstorage.get('pd'));
      } else {
          console.log('im null',this.localstorage.get('ed'));
      }
    }

    /* trying to set value of other subject ot subject if suject is other */
    // public settingOtherSubjectToSubject(){
    //   if(this.sscSubject.value === 'Other'){
    //     this.sscSubject =this.form.controls['otherSscSubject'];
    //   }
    //   if(this.hsscSubject.value === 'Other'){
    //     this.hsscSubject = this.form.controls['otherHsscSubject'];
    //   }
    // }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values: object):void {
      this.submitted = true;
      var localBody;
      if (this.form.valid) {
        if(this.applyingDegree === 'Undergraduate'){
          localBody = this.sameBodyContent();

          if(localBody.sscSubject !== 'Other'){
            localBody.otherSscSubject = null;
          } else if(localBody.hsscSubject !== 'Other'){
            localBody.otherHsscSubject = null;
          }

          if(localBody.hsscResultAwaiting === false){
            localBody.hsscRollNumber = null;
          }
          if(localBody.undergraduateResultAwaiting === false){
            localBody.undergraduateRollNumber = null;
          }
        }
        else if(this.applyingDegree === 'Graduate'){
          localBody = this.sameBodyContent();
          if(localBody.sscSubject !== 'Other'){
            localBody.otherSscSubject = null;
          } else if(localBody.hsscSubject !== 'Other'){
            localBody.otherHsscSubject = null;
          }

          if(localBody.hsscResultAwaiting === false){
            localBody.hsscRollNumber = null;
          }
          if(localBody.undergraduateResultAwaiting === false){
            localBody.undergraduateRollNumber = null;
          }

          localBody.graduateDegree = this.graduateDegree.value;
          localBody.graduateYear = this.graduateYear.value;
          localBody.graduateUniversity = this.graduateUniversity.value;
          localBody.graduateSubjects = this.graduateSubjects.value;
          localBody.graduateTotalMarks = this.graduateTotalMarks.value;
          localBody.graduateObtainedMarks = this.graduateObtainedMarks.value;
        }
        else {

          localBody = this.sameBodyContent();
          if(localBody.sscSubject !== 'Other'){
            localBody.otherSscSubject = null;
          } else if(localBody.hsscSubject !== 'Other'){
            localBody.otherHsscSubject = null;
          }

          if(localBody.hsscResultAwaiting === false){
            localBody.hsscRollNumber = null;
          }
          if(localBody.undergraduateResultAwaiting === false){
            localBody.undergraduateRollNumber = null;
          }
          localBody.graduateDegree = this.graduateDegree.value;
          localBody.graduateYear = this.graduateYear.value;
          localBody.graduateUniversity = this.graduateUniversity.value;
          localBody.graduateSubjects = this.graduateSubjects.value;
          localBody.graduateTotalMarks = this.graduateTotalMarks.value;
          localBody.graduateObtainedMarks = this.graduateObtainedMarks.value;
          localBody.msMphilDegree = this.msMphilDegree.value;
          localBody.msMphilYear = this.msMphilYear.value;
          localBody.msMphilUniversity = this.msMphilUniversity.value;
          localBody.msMphilSubjects = this.msMphilSubjects.value;
          localBody.msMphilTotalMarks = this.msMphilTotalMarks.value;
          localBody.msMphilObtainedMarks = this.msMphilObtainedMarks.value;
          localBody.msMphilThesis = this.msMphilThesis.value;
        }
      }
      //adding checked icon with title when this form is filled
      PAGES_MENU[0].children[1].children[2].data.menu.icon = 'ion-android-done';
      //method responsible for showing sidebar
      this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
      //navigating to uploadPhoto after this form is submitted
      this.router.navigateByUrl('/pages/application/uploadPhoto');
      //saving variable status to localstorage
      this.localstorage.set('ed', localBody);
    }

}
