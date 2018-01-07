import { StorageBrowser } from './../../../shared/sdk/storage/storage.browser';
//imports section
// imports angular modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Http } from '@angular/http';

//importing services to be used in this class
import { ApplyingDegreeService } from './../Services/applyingDegree.service';
//import { StudentRecordApi } from './../../../shared/sdk/services/custom/StudentRecord';
import { BaMenuService } from 'app/theme';

//importing email validator
import { EmailValidator } from './../../../theme/validators/email.validator';
import { MaskValidator } from './../../../theme/validators/mask.validator';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from './../../pages.menu';

//improting loopbackconfig from sdk script to interact with backend
import { LoopBackConfig } from 'app/shared/sdk';

//declaring component with component decorator
@Component({
    selector:'personal-details',
    templateUrl: './personalDetails.html',
    styleUrls:  ['../application.scss']
})

//defining and exporting PeronalDetails class
export class PersonalDetails implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public degreeType: AbstractControl;
    public name: AbstractControl;
    public fatherName: AbstractControl;
    public email: AbstractControl;
    public dob: AbstractControl;
    public gender: AbstractControl;
    public nationality: AbstractControl;
    public domicile: AbstractControl;
    public district: AbstractControl;
    public mobile: AbstractControl;
    public cnic: AbstractControl;
    public passport: AbstractControl;
    public department: AbstractControl;

    private domiciles: any;
    private genders: any;
    private degrees: any;
    private districts: any;
    private nations: any;
    private departments : any;
    private cnicMask = [ /[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/,];
    private mobileMask = [ /[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,];

    public submitted: boolean = false;

    //constructor for PersonalDetails class
    constructor(
        private _menuService: BaMenuService, 
        fb: FormBuilder, 
        private http:Http, 
        private applyingDegreeService: ApplyingDegreeService,
        private localstorage: StorageBrowser, 
        private router: Router){
        this.form = fb.group({
            'degreeType': ['',Validators.required],
            'department': [{value: '', disabled: true},Validators.required],
            'name': ['',Validators.required],
            'fatherName': ['',Validators.required],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'dob': ['', Validators.required],
            'gender': ['', Validators.required],
            'nationality': ['', Validators.required],
            'domicile': ['', Validators.required],
            'district': ['', Validators.required],
            'mobile': ['', Validators.compose([Validators.required,MaskValidator.validate])],
            'cnic': ['', Validators.compose([Validators.required,MaskValidator.validate])],
            'passport': ['', Validators.required]
        });

        //assigning form controls to abstractControl variables
        this.degreeType = this.form.controls['degreeType'];
        this.name = this.form.controls['name'];
        this.fatherName = this.form.controls['fatherName'];
        this.email = this.form.controls['email'];
        this.dob = this.form.controls['dob'];
        this.gender = this.form.controls['gender'];
        this.nationality = this.form.controls['nationality'];
        this.domicile = this.form.controls['domicile'];
        this.district = this.form.controls['district'];
        this.mobile = this.form.controls['mobile'];
        this.cnic = this.form.controls['cnic'];
        this.passport = this.form.controls['passport'];
        this.department = this.form.controls['department'];
        LoopBackConfig.setBaseURL("http://localhost:3000");
    }

    onChangeDT(degreeType: any){
        if(degreeType !== '--select degree--'){
            this.form.get('department').enable();
        }

        if(degreeType === 'PHD' || degreeType === 'Graduate'){
            this.showMenus(true);
            this.sendApplyingDegree();
         }else{
            this.showMenus(false);
            this.sendApplyingDegree();
         }
    }

    //show menus function
    private showMenus(flag: boolean){
        if(flag){
            
            PAGES_MENU[0].children[1].children[8].path = 'fundDetails';
            PAGES_MENU[0].children[1].children[8].data.menu.title = 'Fund Details';
            PAGES_MENU[0].children[1].children[8].data.menu.icon = '';
            PAGES_MENU[0].children[1].children[8].data.menu.selected = false;
            PAGES_MENU[0].children[1].children[8].data.menu.expanded = false;
            PAGES_MENU[0].children[1].children[8].data.menu.order = 0;
            
            PAGES_MENU[0].children[1].children[9].path = 'researchInterest';
            PAGES_MENU[0].children[1].children[9].data.menu.title = 'Research Interests';
            PAGES_MENU[0].children[1].children[9].data.menu.icon = '';
            PAGES_MENU[0].children[1].children[9].data.menu.selected = false;
            PAGES_MENU[0].children[1].children[9].data.menu.expanded = false;
            PAGES_MENU[0].children[1].children[9].data.menu.order = 0;
            
        } else {
            PAGES_MENU[0].children[1].children[8].path = null;
            PAGES_MENU[0].children[1].children[8].data.menu.title = null;
            PAGES_MENU[0].children[1].children[8].data.menu.icon = null;
            PAGES_MENU[0].children[1].children[8].data.menu.selected = null;
            PAGES_MENU[0].children[1].children[8].data.menu.expanded = null;
            PAGES_MENU[0].children[1].children[8].data.menu.order = null;

            PAGES_MENU[0].children[1].children[9].path = null;
            PAGES_MENU[0].children[1].children[9].data.menu.title = null;
            PAGES_MENU[0].children[1].children[9].data.menu.icon = null;
            PAGES_MENU[0].children[1].children[9].data.menu.selected = null;
            PAGES_MENU[0].children[1].children[9].data.menu.expanded = null;
            PAGES_MENU[0].children[1].children[9].data.menu.order = null;
        }
        
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }
    //defining onChange() Method which is bind with change of nationality form control to enable/disable some form control on nationality value
    onChange(nationality){
        if(nationality === 'Pakistan'){
            this.form.get('cnic').enable();
            this.form.get('domicile').enable();
            this.form.get('district').enable();
            this.form.get('passport').disable();
        } else {
            this.form.get('cnic').disable();
            this.form.get('district').disable();
            this.form.get('domicile').disable();
            this.form.get('passport').enable();
        }
    }
    
    // sending degree of student to service to be used by other components
    sendApplyingDegree(): void {
        // send applying Degree to subscribers via observable subject
        this.applyingDegreeService.sendApplyingDegree(this.degreeType.value);
    }

    //defining getCities() method for getting data from json file at specified location which contains cities of pakistan
    public getCities(){
        return this.http.get('/assets/countries-cities/cities-pak.json')
        .map((res: any) => res.json());
    }

    //defining getNation() method for getting data from json file at specified location which contains countries
    public getNation(){
        return this.http.get('/assets/countries-cities/countries-by-name.json')
        .map((res: any) => res.json());
    }

    //ngOnit hook is called before the form is loaded
    ngOnInit(): void {
        if(this.localstorage.get('pd') !== null){
            console.log(this.localstorage.get('pd'));
            this.restorePersonalDetails(this.localstorage.get('pd'));
        } else {
            console.log('im null',this.localstorage.get('pd'));
        }
        //defining different arrays
        this.degrees = ['Undergraduate', 'Graduate','PHD'];
        this.genders = ['Male','Female'];
        this.domiciles = ['AJK', 'Balochistan','Fata', 'Gigit-Baltistan', 'Islamabad Capital Territory','Khyber PakhtoonKhawa', 'Punjab', 'Sindh'];
        this.departments = ['BSCS','BSSE','BSIT'];

        //using getCities() method which contains cities name to assign data to array
        this.getCities()
        .subscribe((data) => {
            this.districts = data;
        }, (error) => {
            console.log('Unable to load some data'+ error);
        });

        //using getNation() method which contins countries name to assign data to array
        this.getNation().
        subscribe((data) => {
            this.nations = data;
        }, (error) => {
            console.log('Unable to upload some data'+ error);
        });

    }

    //restorePersonalDetails
    public restorePersonalDetails(body:any){

        this.form.controls['name'].setValue(body.name);
        this.form.controls['degreeType'].setValue(body.applyingFor);
        this.form.controls['fatherName'].setValue(body.fatherName);
        this.form.controls['email'].setValue(body.email);
        this.form.controls['dob'].setValue(body.DOB);
        this.form.controls['gender'].setValue(body.gender);
        this.form.controls['nationality'].setValue(body.nationality);
        if(body.nationality === 'Pakistan'){

            this.form.controls['domicile'].setValue(body.domicile);
            this.form.controls['district'].setValue(body.district);
            this.form.controls['cnic'].setValue(body.cnic);

        } else {
            this.form.controls['passport'].setValue(body.passport);
        }
        this.onChange(body.nationality);
        this.form.controls['mobile'].setValue(body.mobile);
        this.form.controls['department'].setValue(body.department);
        this.onChangeDT('degreeType');
        //show menus on selected base
        if(body.applyingFor === 'PHD' || body.applyingFor === 'Graduate'){
            this.showMenus(true);
            this.sendApplyingDegree();
         }else if(body.applyingFor === 'Undergraduate'){
            this.showMenus(false);
            this.sendApplyingDegree();
         }
         //adding checked icon with title when this form is filled
         PAGES_MENU[0].children[1].children[0].data.menu.icon = 'ion-android-done';
         
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }
    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values:object):void {
        this.submitted = true;
        var localbody ;
            if (this.form.valid) {
                if(this.nationality.value === 'Pakistan'){
                    localbody = {
                        'applyingFor': this.degreeType.value,
                        'department': this.department.value,
                        'name': this.name.value,
                        'fatherName': this.fatherName.value,
                        'DOB': this.dob.value,
                        'gender': this.gender.value,
                        'nationality': this.nationality.value,
                        'domicile': this.domicile.value,
                        'district': this.district.value,
                        'cnic': this.cnic.value,
                        'mobile': this.mobile.value,
                        'email': this.email.value
                      };
                }else{
                    localbody = {
                        'applyingFor': this.degreeType.value,
                        'department': this.department.value,
                        'name': this.name.value,
                        'fatherName': this.fatherName.value,
                        'DOB': this.dob.value,
                        'gender': this.gender.value,
                        'nationality': this.nationality.value,
                        'passport': this.passport.value,
                        'mobile': this.mobile.value,
                        'email': this.email.value
                      };
                }
            //   this.studentRecordApi.create(body).subscribe(
            //     data => {
            //       alert('data added successfully');
            //       console.log('');
            //     }
            //   );
            //showing fundDetails and research interest forms when student's applying degree is PHD or graduation

            //adding checked icon with title when this form is filled
            PAGES_MENU[0].children[1].children[0].data.menu.icon = 'ion-android-done';

            //method responsible for showing sidebar
            this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

            //navigating to addressDetails after this form is submitted
            this.router.navigateByUrl('/pages/application/addressDetails');

            //saving variable status to localstorage
            this.localstorage.set('pd', localbody);
        }
    }
}