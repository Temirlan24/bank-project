import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  @ViewChild('addElem') addElem: ElementRef;
  
  user: string;
  pin: number | undefined;
  userClose: string;
  pinConfirmToClose: number;
  isShowDiv = false;
  showLogIn = false;
  
  balance: number  = 25000;

  amount: number;
  loan: number;

  transferTo: string;
  myDate: Date;

  userLogin: string | null = "js" ;
  userPin: number | null = 1111;

  actions: { className: string, description: string, sign:string, money: number, date: Date }[] = [
    { className: "mylabelGreen", description: "Deposit", sign:"+", money: 1000, date: new Date("2021-09-12") },
    { className: "mylabelGreen", description: "Deposit",sign:"+",  money: 3500, date: new Date("2021-10-20") },
    { className: "mylabelRed", description: "Withdraw",sign:"-",  money: 4500, date: new Date("2021-10-28") },
  ];
  constructor(public datepipe: DatePipe, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.myDate = new Date();
  }

  enter(){
    if(this.user === this.userLogin && this.pin === this.userPin ){
      this.isShowDiv = true;
      this.showLogIn = false;
      this.user = '';
      this.pin = undefined;
    }
    else{
      this.showLogIn = true;
      alert("Enter new values");
    }
  }
  transfer(){
    this.transferTo = this.transferTo.toLowerCase();
    if( this.transferTo==="deposit" && this.amount>0){
      this.balance-=this.amount;
      this.myDate = new Date();
      this.addBlock(this.amount, 'deposit', "mylabelGreen");
    }
    else if(this.transferTo==="withdraw" && this.amount>0){
      this.balance-=this.amount;
      this.myDate = new Date();
      let latest_date =this.datepipe.transform(this.myDate, 'dd/mm/yyyy');
      this.addBlock(this.amount, 'withdraw', "mylabelRed");
    }
  }
  requestLoan(){
    this.balance += this.loan;
    this.myDate = new Date();
    this.addBlock(this.loan, 'Get Loan', "mylabelGreen");
  }
  closeAcc(){
    if(this.userClose==="js" && this.pinConfirmToClose===1111){
      alert("Account was closed");
      this.userLogin = null;
      this.userPin = null;
    }
  }
  addBlock(money:number, description:string, className: string){
    let temp = { 
      className: className, 
      description: description,
      sign:"+", 
      money: money, 
      date: new Date()
    }
    this.actions.push(temp);
  }
}
