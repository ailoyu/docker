import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';
  // Test 1
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
  // End test 1



@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  // Test 1
  private initialLoadComplete = false;
  // End test 1

  constructor(
    private loadingService: LoadingService,
    // Test 1
    private router: Router,
    private activatedRoute: ActivatedRoute
    // End test 1
    ) {}

  ngOnInit() {
    // // Trigger initial load
    // this.loadingService.show();
    // // Simulate an API call or any asynchronous operation
    // setTimeout(() => {
    //   this.loadingService.hide();
    //   // Mark initial load as complete
    //   this.loadingService.setInitialLoadComplete();
    // }, 2000); // Adjust the time according to your needs
  }
}
