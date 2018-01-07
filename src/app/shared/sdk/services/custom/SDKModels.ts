/* tslint:disable */
import { Injectable } from '@angular/core';
import { Studentregisteration } from '../../models/Studentregisteration';
import { Email } from '../../models/Email';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Studentregisteration: Studentregisteration,
    Email: Email,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
