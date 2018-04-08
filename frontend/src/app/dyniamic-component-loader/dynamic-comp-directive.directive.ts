import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicCompDirective]'
})
export class DynamicCompDirectiveDirective {

  constructor(public viewContainer: ViewContainerRef) { }

}
