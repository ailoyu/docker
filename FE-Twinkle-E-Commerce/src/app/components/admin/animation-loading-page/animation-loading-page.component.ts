import { Component } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-animation-loading-page',
  templateUrl: './animation-loading-page.component.html',
  styleUrls: ['./animation-loading-page.component.scss']
})

export class AnimationLoadingPageComponent {
  constructor(public loadingService: LoadingService) {} // Inject LoadingService here
}
