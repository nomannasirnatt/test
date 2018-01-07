//importing angular modules
import { Router, Routes } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { StorageBrowser } from './../../../shared/sdk/storage/storage.browser';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//importing validators for mask
import { MaskValidator } from './../../../theme/validators/mask.validator';

//declaring component with component decorator
@Component({
    selector:'address-details',
    templateUrl: './addressDetails.html',
    styleUrls: ['../application.scss']
})

//defining and exporting AddressDetails class
export class AddressDetails implements OnInit{
    //declaring Variables
    public form: FormGroup;
    public permanentAddress: AbstractControl;
    public permanentCity: AbstractControl;
    public permanentPhone: AbstractControl;
    public mailingAddress: AbstractControl;
    public mailingCity: AbstractControl;
    public mailingPhone: AbstractControl;
    public fatherAddress: AbstractControl;
    public fatherCity: AbstractControl;
    public fatherPhone: AbstractControl;
    public mailingCheckbox: AbstractControl;
    public fatherCheckbox: AbstractControl;
    public submitted:boolean = false;
    private mobileMask = [ /[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,];

    private cities: any;

    //constructor for AddressDetails class
    constructor(
        private _menuService: BaMenuService, 
        fb:FormBuilder,
        private http: Http, 
        private localstorage:StorageBrowser,
        private router: Router) {
        this.form = fb.group({
            'permanentAddress': ['',Validators.compose([Validators.required, Validators.minLength(8)]) ],
            'permanentCity': ['',Validators.required],
            'permanentPhone': ['', Validators.compose([Validators.required,MaskValidator.validate])],
            'mailingAddress': ['',Validators.compose([Validators.required, Validators.minLength(8)]) ],
            'mailingCity': ['',Validators.compose([Validators.required ]) ],
            'mailingPhone': ['', Validators.compose([Validators.required,MaskValidator.validate])],
            'fatherAddress': ['',Validators.compose([Validators.required, Validators.minLength(8)]) ],
            'fatherCity': ['',Validators.compose([Validators.required ]) ],
            'fatherPhone': ['', Validators.compose([Validators.required,MaskValidator.validate])],
            'mailingCheckbox': [''],
            'fatherCheckbox': ['']
        });

        //assigning form controls to abstractControl variables
        this.permanentAddress = this.form.controls['permanentAddress'];
        this.permanentCity = this.form.controls['permanentCity'];
        this.permanentPhone = this.form.controls['permanentPhone'];
        this.mailingCheckbox = this.form.controls['mailingCheckbox'];
        this.mailingAddress = this.form.controls['mailingAddress'];
        this.mailingCity = this.form.controls['mailingCity'];
        this.mailingPhone = this.form.controls['mailingPhone'];
        this.fatherCheckbox = this.form.controls['fatherCheckbox'];
        this.fatherAddress = this.form.controls['fatherAddress'];
        this.fatherCity = this.form.controls['fatherCity'];
        this.fatherPhone = this.form.controls['fatherPhone'];
        }

        //method for setting validotrs(null) if mailing address is same as permament address
        onChange(checked){          
            if(checked){
                this.mailingAddress.setValue(this.permanentAddress.value);
                this.mailingCity.setValue(this.permanentCity.value);
                this.mailingPhone.setValue(this.permanentPhone.value);
            }
            this.addressSame('mailing',checked);    
        }

        //method for setting validotrs(null) if father address is same as permament address
        onFChange(checked){        
            if(checked){
                this.fatherAddress.setValue(this.permanentAddress.value);
                this.fatherCity.setValue(this.permanentCity.value);
                this.fatherPhone.setValue(this.permanentPhone.value);
                
            }
            this.addressSame('father',checked);   
        }

        addressSame(formControlType: string, checked: boolean){
            if(checked){
                this.form.get(formControlType+'Address').disable();
                this.form.get(formControlType+'City').disable();
                this.form.get(formControlType+'Phone').disable();
            } else {
                this.form.get(formControlType+'Address').enable();
                this.form.get(formControlType+'City').enable();
                this.form.get(formControlType+'Phone').enable();
            }  
        }

        //method for getting data from json file at specified location which contains cities of pakistan
        public getCities(){
            return this.http.get('/assets/countries-cities/cities-pak.json')
            .map((res:any) => res.json());
          } 

        //ngOnit hook is called before the form is loaded
        ngOnInit(): void {
            //using getCities method which contains cities name to assign data to array
            this.getCities()
            .subscribe((data) => {
              this.cities = data;
            },(error) => {
              console.log("Unable to load some data" + error)
            });
            //restoring variable status 
            if(this.localstorage.get('ad') !== null){
                
                const body = this.localstorage.get('ad');
                this.permanentAddress.setValue(body.permanentAddress);
                this.permanentCity.setValue(body.permanentCity);
                this.permanentPhone.setValue(body.permanentPhone);
                this.mailingAddress.setValue(body.mailingAddress);
                this.mailingCity.setValue(body.mailingCity);
                this.mailingPhone.setValue(body.mailingPhone);
                this.fatherAddress.setValue(body.fatherAddress);
                this.fatherCity.setValue(body.fatherCity);
                this.fatherPhone.setValue(body.fatherPhone);
                //adding checked icon for addressdetails with title when this form is filled
                PAGES_MENU[0].children[1].children[1].data.menu.icon = 'ion-android-done';
                //method responsible for showing sidebar
                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
            }
        }

        //defining onSubmit() method which is called when submit button is clicked
        public onSubmit(values: object):void {
            this.submitted = true;
            var body;
            if (this.form.valid) {
                body = {
                    'permanentAddress': this.permanentAddress.value,
                    'permanentCity': this.permanentCity.value,
                    'permanentPhone': this.permanentPhone.value,
                    'mailingAddress': this.mailingAddress.value,
                    'mailingCity': this.mailingCity.value,
                    'mailingPhone': this.mailingPhone.value,
                    'fatherAddress': this.fatherAddress.value,
                    'fatherCity': this.fatherCity.value,
                    'fatherPhone': this.fatherPhone.value,
                    'mailingCheckbox':this.mailingCheckbox.value,
                    'fatherCheckbox': this.fatherCheckbox.value
                }
            }
            //adding checked icon with title when this form is filled
            PAGES_MENU[0].children[1].children[1].data.menu.icon = 'ion-android-done';
            //method responsible for showing sidebar
            this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
            //navigating to educationalDetails after this form is submitted
            this.router.navigateByUrl('/pages/application/educationalDetails');   
            //send variables status to the localstorage
            this.localstorage.set('ad',body);
        }
}