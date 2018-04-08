import { 
  Component, 
  Inject,
  ViewContainerRef, ViewChild, OnInit
} from '@angular/core'

// Service
import { DynamicComponentService } from './shared/services/dynamic-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  service: any;

  @ViewChild('dynamic', { 
    read: ViewContainerRef 
  }) viewContainerRef: ViewContainerRef;

  constructor(@Inject(DynamicComponentService) service) {
    this.service = service;
  }


  ngOnInit() {
    this.service.setRootViewContainerRef(this.viewContainerRef)
    this.service.addDynamicComponent()
  }
}
