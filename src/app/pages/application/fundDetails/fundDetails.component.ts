import { Router } from '@angular/router';
//imports section
// imports angular modules
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { StorageBrowser } from 'app/shared/sdk';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from './../../pages.menu';

//declaring component with component decorator
@Component({
    selector: 'fund-details',
    templateUrl: './fundDetails.html'

})

//defining and exportig FundDetails class
export class FundDetails implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public source: AbstractControl;
    public amount: AbstractControl;
    public duration: AbstractControl;
    public submitted: boolean = false;

    //constructor for FundDetails class
    constructor(
        fb: FormBuilder,
        private _menuService: BaMenuService,
        private router:Router,
        private localstorage: StorageBrowser){
        this.form = fb.group({
            'source': [''],
            'amount': [''],
            'duration': ['']
        });
        //assiging form controls to abstractControl variables
        this.source = this.form.controls['source'];
        this.amount = this.form.controls['amount'];
        this.duration = this.form.controls['duration'];
    }

    //ngOnit hook is executed before the form is loaded
    ngOnInit(): void {
        if(this.localstorage.get('fnd') !== null){
            this.restoreFundDetails(this.localstorage.get('fnd'));
        } else {
            console.log('im null',this.localstorage.get('fnd'));
        }
    }

    //restoreFundDetails
    public restoreFundDetails(body:any){
        this.source.setValue(body.source);
        this.amount.setValue(body.amount);
        this.duration.setValue(body.duration);

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[8].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //when skip button is pressed
    public onSkipClick(): void {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[8].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //defining onSubmit method which is called when submit button is clicked
    public onSubmit(values: object):void {
        this.submitted = true;
        var localBody = {
            'source' : this.source.value,
            'amount' : this.amount.value,
            'duration' : this.duration.value
        }

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[8].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

        this.router.navigateByUrl('/pages/application/researchInterest');

         // saving variable status to local storage
         this.localstorage.set('fnd', localBody);
    }
}