import { 
  Component, 
  Inject,
  ViewContainerRef, ViewChild, OnInit
} from '@angular/core'

// Service
import { DynamicComponentService } from './../shared/services/dynamic-component.service';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  public service: any;

  @ViewChild('dynamic', { 
    read: ViewContainerRef 
  }) viewContainerRef: ViewContainerRef;

  constructor(@Inject(DynamicComponentService) service) { 
    this.service = service;
  }

  ngOnInit() {
    this.componentLoader();
  }

  public componentLoader() {
    this.service.setRootViewContainerRef(this.viewContainerRef)
    this.service.addDynamicComponent();
  }

}
