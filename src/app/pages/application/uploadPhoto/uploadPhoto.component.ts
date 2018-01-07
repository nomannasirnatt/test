//imports section
// imports angular modules
import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//declaring component with component decorator
@Component({
    selector: 'upload-photo',
    templateUrl: './uploadPhoto.html'
})

//defining and exporting UploadPhoto class
export class UploadPhoto{
    //declaring valriables
    public submitted: boolean = false;
    public check: boolean = true;
    public defaultPicture = '/assets/img/theme/no-photo.png';
    public profile:any = {
      picture: ''
    };

    //constructor for UploadPhot class
    constructor(private slimLoader: SlimLoadingBarService, private _menuService: BaMenuService, private router: Router){
    }

    public uploaderOptions:NgUploaderOptions = {
        // url: 'http://website.com/upload'
        url: '',
      };

    //defining onSubmit method which is called when submit button is clicked
    public onSubmit(values: object):void {
        this.submitted = true;
        console.log(this.check);
        
        if(this.check){
          //To show the progress bar on progress
          this.slimLoader.progress+=10;
          this.check = false;
        }
        console.log(this.check);
        
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[3].data.menu.icon = 'ion-android-done';
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        //navigating to languageProficiency after this form is submitted
        this.router.navigateByUrl('/pages/application/languageProficiency');
      }
}