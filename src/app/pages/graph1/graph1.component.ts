import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css'],
})
export class Graph1Component implements OnInit {
  public labelProduct: string[] = ['Product 1', 'Product 2', 'Product 3'];
  public labelInventory: string[] = [
    'Inventory 1',
    'Inventory 2',
    'Inventory 3',
  ];

  constructor() {}

  ngOnInit(): void {}
}
