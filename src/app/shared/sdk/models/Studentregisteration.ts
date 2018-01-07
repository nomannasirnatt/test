/* tslint:disable */

declare var Object: any;
export interface StudentregisterationInterface {
  "StudentName": string;
  "AppliedFor": string;
  "Nationality": string;
  "CNIC": string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "password"?: string;
  accessTokens?: any[];
}

export class Studentregisteration implements StudentregisterationInterface {
  "StudentName": string;
  "AppliedFor": string;
  "Nationality": string;
  "CNIC": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "password": string;
  accessTokens: any[];
  constructor(data?: StudentregisterationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Studentregisteration`.
   */
  public static getModelName() {
    return "Studentregisteration";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Studentregisteration for dynamic purposes.
  **/
  public static factory(data: StudentregisterationInterface): Studentregisteration{
    return new Studentregisteration(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Studentregisteration',
      plural: 'Studentregisterations',
      path: 'Studentregisterations',
      properties: {
        "StudentName": {
          name: 'StudentName',
          type: 'string'
        },
        "AppliedFor": {
          name: 'AppliedFor',
          type: 'string'
        },
        "Nationality": {
          name: 'Nationality',
          type: 'string'
        },
        "CNIC": {
          name: 'CNIC',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
      }
    }
  }
}
