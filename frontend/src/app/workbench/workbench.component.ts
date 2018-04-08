import { Component, OnInit, ComponentFactory, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent implements OnInit {

  constructor(public componentFactoryResolver: ComponentFactoryResolver, componentFactory: ComponentFactory<any>,
              public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  loadComponent() {
  //  let componentFactory = componentFactory.
  }

}
