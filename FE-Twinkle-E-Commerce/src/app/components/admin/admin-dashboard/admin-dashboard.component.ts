import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HeightService } from 'src/app/service/height.service';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  subMenuVisible = false;
  subMenuVisible1 = false;
  subMenuVisible2 = false;
  
  constructor(private router: Router, private heightService: HeightService) {}


  toggleSubMenu() {
    debugger
    this.subMenuVisible = !this.subMenuVisible;
  }

  toggleSubMenu1() {
    debugger
    this.subMenuVisible1 = !this.subMenuVisible1;
  }

  toggleSubMenu2() {
    debugger
    this.subMenuVisible2 = !this.subMenuVisible2;
  }


  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setSidebarHeight();
      }
    });
  }

  setSidebarHeight() {
    const currentRoute = this.router.url;
  
    if (currentRoute.includes('/admin/panel')) {
      this.heightService.setHeight(3282);
    } else if (currentRoute.includes('/admin/order-confirm/pending')) {
      this.heightService.setHeight(2000);
    } else if (currentRoute.includes('/admin/list-categories')) {
      this.heightService.setHeight(7000);
    } else if (currentRoute.includes('/admin/list-customers')) {
      this.heightService.setHeight(4000);
    } else {
      // Set a default height
      this.heightService.setHeight(500);
    }
  }
  
  
  // Test
  // subMenuVisible = false;
  // subMenuVisible1 = false;
  // subMenuVisible2 = false;
  // selectedSubMenu: string = '';

  // constructor(private router: Router) {
  //   // Subscribe to the NavigationEnd event to detect when navigation has completed
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       // Check if the current route contains any of the submenu routes
  //       if (this.router.url.includes('/admin/list-users')) {
  //         this.selectedSubMenu = 'users';
  //       } else if (this.router.url.includes('/admin/list-providers')) {
  //         this.selectedSubMenu = 'providers';
  //       } else if (this.router.url.includes('/admin/list-products')) {
  //         this.selectedSubMenu = 'products';
  //       } else {
  //         // Reset the selected submenu if the route doesn't match any submenu route
  //         this.selectedSubMenu = '';
  //       }
  //     }
  //   });
  // }

  // toggleSubMenu() {
  //   this.subMenuVisible = !this.subMenuVisible;
  // }

  // toggleSubMenu1() {
  //   this.subMenuVisible1 = !this.subMenuVisible1;
  // }

  // toggleSubMenu2() {
  //   this.subMenuVisible2 = !this.subMenuVisible2;
  // }
}
