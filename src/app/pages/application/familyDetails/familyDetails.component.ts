//imports section
// imports angular modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { StorageBrowser } from 'app/shared/sdk';

//importing services and maskvalidator to be used in this class
import { BaMenuService } from 'app/theme';
import { MaskValidator } from './../../../theme/validators/mask.validator';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//declaring component with component decorator
@Component({
    selector:'family-Details',
    templateUrl: './familyDetails.html'
})

//defining and exporting FamilyDetailsclass
export class FamilyDetails implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public livingStatus: AbstractControl;
    public noOfDependants: AbstractControl;
    public monthlyIncome: AbstractControl;
    public guardianFatherName: AbstractControl;
    public guardianFatherOccupation: AbstractControl;
    public guardianFatherPhone: AbstractControl;
    public guardianFatherMobile: AbstractControl;
    public accountTitle: AbstractControl;
    public accountNo: AbstractControl;
    public bankName: AbstractControl;
    public bankBranch: AbstractControl;
    public submitted: boolean = false;

    private mobileMask = [ /[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,];
    
    //constructor for FamilyDetails class
    constructor(
        private _menuService: BaMenuService,
        fb:FormBuilder, private router: Router,
        private localstorage: StorageBrowser) {
        this.form = fb.group({
            'livingStatus' : ['',Validators.required],
            'noOfDependants' : ['',Validators.required],
            'monthlyIncome' : ['',Validators.required],
            'guardianFatherName' : ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'guardianFatherOccupation' : ['',Validators.required],
            'guardianFatherPhone' : [''],
            'guardianFatherMobile' : ['',Validators.compose([Validators.required,MaskValidator.validate])],
            'accountTitle' : [''],
            'accountNo' : [''],
            'bankName' : [''],
            'bankBranch' : ['']
        });
        //assigning form controls to abstractControl variables
        this.livingStatus = this.form.controls['livingStatus'];
        this.noOfDependants = this.form.controls['noOfDependants'];
        this.monthlyIncome = this.form.controls['monthlyIncome'];
        this.guardianFatherName = this.form.controls['guardianFatherName'];
        this.guardianFatherOccupation = this.form.controls['guardianFatherOccupation'];
        this.guardianFatherPhone = this.form.controls['guardianFatherPhone'];
        this.guardianFatherMobile = this.form.controls['guardianFatherMobile'];
        this.accountTitle = this.form.controls['accountTitle'];
        this.accountNo = this.form.controls['accountNo'];
        this.bankName = this.form.controls['bankName'];
        this.bankBranch = this.form.controls['bankBranch'];
    }

    //ngOnit hook is executed before the form is loaded
    ngOnInit(): void {
        if(this.localstorage.get('fd') !== null){
            this.restoreFamilyDetails(this.localstorage.get('fd'));
        } else {
            console.log('im null',this.localstorage.get('fd'));
        }
    }

    //restoreFamilyDetails
    public restoreFamilyDetails(body:any){
        this.livingStatus.setValue(body.livingStatus);
        this.noOfDependants.setValue(body.noOfDependants);
        this.monthlyIncome.setValue(body.monthlyIncome);
        this.guardianFatherName.setValue(body.guardianFatherName);
        this.guardianFatherOccupation.setValue(body.guardianFatherOccupation);
        this.guardianFatherPhone.setValue(body.guardianFatherPhone);
        this.guardianFatherMobile.setValue(body.guardianFatherMobile);
        this.accountTitle.setValue(body.accountTitle);
        this.accountNo.setValue(body.accountNo);
        this.bankName.setValue(body.bankName);
        this.bankBranch.setValue(body.bankBranch);

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values:object): void {
        this.submitted = true;
        var localBody;
        if(this.form.valid) {
            localBody = {
                'livingStatus' : this.livingStatus.value,
                'noOfDependants' : this.noOfDependants.value,
                'monthlyIncome' : this.monthlyIncome.value,
                'guardianFatherName' : this.guardianFatherName.value,
                'guardianFatherOccupation' : this.guardianFatherOccupation.value,
                'guardianFatherPhone' : this.guardianFatherPhone.value,
                'guardianFatherMobile' : this.guardianFatherMobile.value,
                'accountTitle' : this.accountTitle.value,
                'accountNo' : this.accountNo.value,
                'bankName' : this.bankName.value,
                'bankBranch' : this.bankBranch.value
            }
        }

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

        //navigating to otherDetails after this form is submitted
        this.router.navigateByUrl('/pages/application/otherDetails');

        //saving variable status to localstorage
        this.localstorage.set('fd', localBody);
    }
    
}