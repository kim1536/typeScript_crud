export class User {
  userId: string;
    userPW: string;
    userNM: string;
    userAg: string;
    creatDT: string;
    id: number;
  constructor( 
    userId: string,
    userPW: string,
    userNM: string,
    userAg: string,
    creatDT: string,
    id: number
  ){
    this.userId = userId;
    this.userPW = userPW;
    this.userNM = userNM;
    this.userAg = userAg;
    this.creatDT = creatDT;
    this.id = id;
  }
}