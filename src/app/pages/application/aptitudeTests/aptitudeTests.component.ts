//imports section
// imports angular modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { StorageBrowser } from 'app/shared/sdk';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';
import { Http } from '@angular/http';

//declaring component with component decorator
@Component({
    selector: 'aptitude-test',
    templateUrl: './aptitudeTests.html'
})

//defining and exporting ApptitudeTests class
export class ApptitudeTests implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public testTypes: any;
    public yearTakens: any;
    public obtainedMarks: any;
    private years: any;

    public submitted: boolean = false;

    //constructor for ApptitudeTests class
    constructor(
        private _menuService: BaMenuService,
        fb: FormBuilder,
        private router: Router,
        private http:Http,
        private localstorage: StorageBrowser){
        this.form = fb.group({
            'testTypes':fb.array(['']),
            'yearTakens': fb.array(['']),
            'obtainedMarks': fb.array([''])
        });
        //assigning form controls to abstractControl variables
        this.testTypes = this.form.controls['testTypes'];
        this.yearTakens = this.form.controls['yearTakens'];
        this.obtainedMarks = this.form.controls['obtainedMarks'];
    }

    //defining onAddLanguage() method which is bind with button to push three arrays
    onAddLanguage() {
        (<FormArray>this.testTypes).push(new FormControl(''));
        (<FormArray>this.yearTakens).push(new FormControl(''));
        (<FormArray>this.obtainedMarks).push(new FormControl(''));  
    }

    //defining onDeleteLanguage() method which is bind with button to delete three arrays
    onDeleteLanguage(){
        (<FormArray>this.testTypes).removeAt(-1);
        (<FormArray>this.yearTakens).removeAt(-1);
        (<FormArray>this.obtainedMarks).removeAt(-1);
    }

    //defining getYears() method for getting data from json file at specified location which contains list of years
    public getYears(){
        return this.http.get('/assets/countries-cities/years.json')
        .map((res: any) => res.json());
      }

    //ngOnit hook is called before the form is loaded
    ngOnInit(): void{
        if(this.localstorage.get('atd') !== null){
            console.log(this.localstorage.get('atd'));
            
            this.restoreAptitudeTestDetails(this.localstorage.get('atd'));
        } else {
            console.log('im null',this.localstorage.get('atd'));
        }

        //using getYears() method which contains list of years to assign data to array
        this.getYears()
        .subscribe((data) => {
        this.years = data;
        },(error) => {
            console.log('Unable to load some data' + error);
        })
    }

    //restoreAptitudeTestDetails
    public restoreAptitudeTestDetails(body:any){
        const len = body.yearTakens.length;
        for(var i:number = 0; i<len-1; i++){
            this.onAddLanguage();
        }
        this.testTypes.setValue(body.testTypes);
        this.yearTakens.setValue(body.yearTakens);
        this.obtainedMarks.setValue(body.obtainedMarks);

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[5].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //when skip button is pressed
    public onSkipClick(): void {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[5].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        
        //navigating to familyDetails after skip button is clicked
        this.router.navigateByUrl('/pages/application/familyDetails');
    }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values:object):void {
        this.submitted = true;
        
        var localBody = {
            'testTypes' : this.testTypes.value,
            'yearTakens' : this.yearTakens.value,
            'obtainedMarks' : this.obtainedMarks.value
        }

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[5].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

        //navigating to familyDetails after this form is submitted
        this.router.navigateByUrl('/pages/application/familyDetails');

        // saving variable status to local storage
        this.localstorage.set('atd', localBody);
    }
}