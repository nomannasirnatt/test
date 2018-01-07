//imports section
// imports angular modules
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Component,  OnInit } from '@angular/core';
import { Routes, Router} from '@angular/router';
import { StorageBrowser } from 'app/shared/sdk';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from '../../../pages/pages.menu';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';
import { ApplyingDegreeService } from 'app/pages/application/Services';

//declaring component with component decorator
@Component({
    selector: 'other-details',
    templateUrl: './otherDetails.html'
})

//defining and exporting OtherDetails class
export class OtherDetails implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public hobbies: any;
    public activities: any;
    public prize: any;
    public awarded: any;
    public applyingDegree: string;
    public submitted: boolean = false;

    //constructor for OtherDetails class
    constructor(
        private _menuService: BaMenuService,
        private fb: FormBuilder,
        private router: Router,
        private applingDegreeService: ApplyingDegreeService,
        private localstorage: StorageBrowser
    ){
        this.form = fb.group({
            'hobbies': fb.array(['']),
            'activities':fb.array(['']),
            'prize': fb.array(['']),
            'awarded': fb.array([''])
        });
        //assigning form controls to abstractControl variables
        this.hobbies = this.form.controls['hobbies'];
        this.activities = this.form.controls['activities'];
        this.prize = this.form.controls['prize'];
        this.awarded = this.form.controls['awarded'];
    }

    //ngOnit hook is executed before the form is loaded
    ngOnInit(): void {
        if(this.localstorage.get('od') !== null){
            this.restoreOtherDetails(this.localstorage.get('od'));
        } else {
            console.log('im null',this.localstorage.get('od'));
        }

        this.applingDegreeService.applyingDegree$.subscribe(applyingDegree => this.applyingDegree = applyingDegree);
    }

    //restoreOtherDetails
    public restoreOtherDetails(body:any){
        const len = body.hobbies.length;
        const lens = body.activities.length;
        for(var i:number = 0; i<len-1 ;i++){
            this.onAddHobby();
        }
        for(var i:number = 0; i<lens-1;i++){
            this.onAddActivity();
        }
        this.hobbies.setValue(body.hobbies);
        this.activities.setValue(body.activities);
        this.prize.setValue(body.prize);
        this.awarded.setValue(body.awarded);

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //when skip button is pressed
    public onSkipClick(): void {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //defining onAddHobby() method which is bind with add hobby button to push another element of array
    onAddHobby() {
        (<FormArray>this.hobbies).push(new FormControl('')); 
    }

    //defining onAddActivity() method which is bind with button to push three arrays
    onAddActivity() {
        (<FormArray>this.activities).push(new FormControl(''));
        (<FormArray>this.prize).push(new FormControl(''));
        (<FormArray>this.awarded).push(new FormControl(''));
    }  
    
    //defining onDeleteHobby() method which is bind with button to delete one element of hobby array
    onDeleteHobby(){
        (<FormArray>this.hobbies).removeAt(-1);
    }

    //defining onDeleteActivity() method which is bind with button to delete three arrays
    onDeleteActivity(){
        (<FormArray>this.activities).removeAt(-1);
        (<FormArray>this.prize).removeAt(-1);
        (<FormArray>this.awarded).removeAt(-1);
    }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values:object):void {
        this.submitted = true;
        var localBody = {
            'hobbies' : this.hobbies.value,
            'activities' : this.activities.value,
            'prize' : this.prize.value,
            'awarded' : this.awarded.value
        }

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

        if(this.applyingDegree === 'PHD' || this.applyingDegree === 'Graduate'){
            this.router.navigateByUrl('/pages/application/fundDetails');
        } else {
            //code goes here
        }

        // saving variable status to local storage
        this.localstorage.set('od', localBody);
    }
}