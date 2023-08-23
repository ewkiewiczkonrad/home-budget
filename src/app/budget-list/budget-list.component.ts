import { Component, OnInit } from '@angular/core';
import { Item } from '../models/items.models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit{
  items: Item[] = [];
  form!: FormGroup;
  

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
  const temp = localStorage.getItem('items');
  temp ? this.items = JSON.parse(temp) : this.items = []

  this.form = this.fb.group({
    name: [''],
    costs: [0]
  })
  }

  addItem(){
    const item: Item = {
      name: this.form.controls['name'].value,
      costs: this.form.controls['costs'].value
    }
    this.items.push(item);
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  clearStorage(){
    this.items = []
    localStorage.clear();
  }

  addCost(item: Item){
    item.costs = this.form.controls['costs'].value;
    localStorage.setItem('items', JSON.stringify(this.items));
    console.log(localStorage.getItem('items'));
  }
}
