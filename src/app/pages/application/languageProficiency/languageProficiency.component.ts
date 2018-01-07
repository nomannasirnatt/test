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

//declaring component with component decorator
@Component({
    selector: 'language-proficiency',
    templateUrl: './languageProficiency.html'
})

//defining and exporting LanguageProficiency class
export class LanguageProficiency implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public languages: any;
    public writtens: any;
    public spokens: any;

    public submitted: boolean = false;

    //constructor for LanguageProficiency class
    constructor(
        private _menuService: BaMenuService,
        fb: FormBuilder,
        private router: Router,
        private localstorage: StorageBrowser){
        this.form = fb.group({
            'languages':fb.array(['']),
            'writtens': fb.array(['']),
            'spokens': fb.array([''])
        });
        //assigning form controls to abstractControl variables
        this.languages = this.form.controls['languages'];
        this.writtens = this.form.controls['writtens'];
        this.spokens = this.form.controls['spokens'];
    }

    //ngOnit hook is executed before the form is loaded
    ngOnInit(): void {
        if(this.localstorage.get('ld') !== null){
            this.restoreLanguageDetails(this.localstorage.get('ld'));
        } else {
            console.log('im null',this.localstorage.get('ld'));
        }
    }

    //restoreLanguageDetails
    public restoreLanguageDetails(body:any){
        const len = body.languages.length;
        for(var i:number=0; i<len-1; i++){
            this.onAddLanguage();
        }
        this.languages.setValue(body.languages);
        this.writtens.setValue(body.writtens);
        this.spokens.setValue(body.spokens);

         //adding checked icon with title when this form is filled
         PAGES_MENU[0].children[1].children[4].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //defining onAddLanguage() method which is bind with button to push three arrays
    onAddLanguage() {
        (<FormArray>this.languages).push(new FormControl(''));
        (<FormArray>this.writtens).push(new FormControl(''));
        (<FormArray>this.spokens).push(new FormControl(''));
    }

    //defining onDeleteLanguage() method which is bind with button to delete three arrays
    onDeleteLanguage(){
        (<FormArray>this.languages).removeAt(-1);
        (<FormArray>this.writtens).removeAt(-1);
        (<FormArray>this.spokens).removeAt(-1);
    }

    //when skip button is pressed
    public onSkipClick(): void {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[4].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        
        //navigating to aptitudeTests after skip button is clicked
        this.router.navigateByUrl('/pages/application/aptitudeTests');
    }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values:object):void {
        this.submitted = true;
        var localBody = {
            'languages' : this.languages.value,
            'writtens' : this.writtens.value,
            'spokens' : this.spokens.value
        }

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[4].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

        //navigating to aptitudeTests after this form is submitted
        this.router.navigateByUrl('/pages/application/aptitudeTests');

        // saving variable status to local storage
        this.localstorage.set('ld', localBody);
    }
}