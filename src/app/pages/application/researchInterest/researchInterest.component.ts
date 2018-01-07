//importing angular modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Routes } from '@angular/router';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//importing StrorageBrowser for storing temporary data
import { StorageBrowser } from 'app/shared/sdk';

//declaring component with component decorator
@Component({
    selector: 'research-interest',
    templateUrl: './researchInterest.html'
})

//defining and exporting ResearchInterest class
export class ResearchInterest implements OnInit{
    //declaring Variables
    public form: FormGroup;
    public researchInterest1: AbstractControl;
    public researchInterest2: AbstractControl;
    public researchInterest3: AbstractControl;
    public submitted:boolean = false;

    //constructor for ResearchInterest class
    constructor(
        private localstorage: StorageBrowser,
        private _menuService: BaMenuService,
        fb: FormBuilder){
        this.form = fb.group({
            'researchInterest1': [''],
            'researchInterest2': [''],
            'researchInterest3': ['']
        });
        //assigning form controls to abstractControl variables
        this.researchInterest1 = this.form.controls['researchInterest1'],
        this.researchInterest2 = this.form.controls['researchInterest2'],
        this.researchInterest3 = this.form.controls['researchInterest3']
    }

    //ngOnit hook is executed before the form is loaded
    ngOnInit(): void {
        if(this.localstorage.get('rd') !== null){
            this.restoreResearchDetails(this.localstorage.get('rd'));
        } else {
            console.log('im null',this.localstorage.get('rd'));
        }
    }

    //restoreResearchDetails
    public restoreResearchDetails(body:any){
        this.researchInterest1.setValue(body.researchInterest1);
        this.researchInterest2.setValue(body.researchInterest2);
        this.researchInterest3.setValue(body.researchInterest3);

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[9].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //when skip button is pressed
    public onSkipClick(): void {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[9].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values: object):void {
        this.submitted = true;
        var localBody = {
            'researchInterest1' : this.researchInterest1.value,
            'researchInterest2' : this.researchInterest2.value,
            'researchInterest3' : this.researchInterest3.value
        }

         //adding checked icon with title when this form is filled
         PAGES_MENU[0].children[1].children[9].data.menu.icon = 'ion-android-done';

         //method responsible for showing sidebar
         this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

        // saving variable status to local storage
         this.localstorage.set('rd', localBody);
    }
}