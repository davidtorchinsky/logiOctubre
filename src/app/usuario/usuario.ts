import {Permission} from "./permission";

export class Usuario {
    _id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    permissions:Permission[];


    constructor(public newId:number,
                public newUsername:string,
                public newFirstName:string,
                public newLastName:string,
                public newPermissions:Permission[]
                ){
        this._id=this.newId;
        this.username=newUsername;
        this.firstName = newFirstName;
        this.lastName = newLastName;
        this.permissions=newPermissions;
    }

}
