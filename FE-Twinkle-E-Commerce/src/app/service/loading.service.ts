import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// test
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';
// end


@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  private initialLoadSubject = new BehaviorSubject<boolean>(this.isInitialLoad());
  public initialLoad$ = this.initialLoadSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // Test 1
  private initialLoadComplete = false; // Track if the initial load is complete
  initialLoadDuration = 1500; // Set the initial load duration to 1.5 seconds
  subsequentLoadDuration = 4000; // Set the subsequent load duration to 5 seconds
  // End test 1



  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  setInitialLoadComplete() {
    this.initialLoadSubject.next(false);
    // Test 1
    this.initialLoadComplete = true;
    // Mark the initial load as complete in localStorage
    localStorage.setItem('hasVisitedBefore', 'true');
    // Test 2
    this.clearLocalStorage(); // Clear localStorage
    // End test 2
    // End test 1
  }

  private isInitialLoad(): boolean {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    return !hasVisitedBefore;
  }

  // Test 1
  // Updated method name to match the calling code
  manualShow() {
    this.loadingSubject.next(true);
  }
  // End test 1

  // private markVisited() {
  //   localStorage.setItem('hasVisitedBefore', 'true');
  // }

  // constructor() {
  //   if (this.isInitialLoad()) {
  //     this.show();
  //     setTimeout(() => {
  //       this.hide();
  //       this.setInitialLoadComplete();
  //       this.markVisited();
  //     }, 1500);
  //   }
  // }


  // Test 1
  constructor() {
    console.log('LoadingService constructor');
    if (this.isInitialLoad()) {
      console.log('Initial load detected. Showing loading animation.');
      this.manualShowWithDuration(1500, true);
  
      setTimeout(() => {
        console.log('Hiding loading animation after 5000ms');
        this.hide();
        this.setInitialLoadComplete();
      }, 1500); // Show loading for 1.5 seconds for all item on header
    }
  }
  // End test 1


  // Test 1
  // New method to manually show the loading spinner for a duration
  manualShowWithDuration(duration: number = 0, initialLoad: boolean = false) {
    this.loadingSubject.next(true);

    // Automatically hide the loading spinner after the specified duration
    if (duration > 0) {
      timer(duration).pipe(take(1)).subscribe(() => {
        this.loadingSubject.next(false);
      });
    }
  }
  // End test 1


  // Test 1
  // Updated method to automatically hide the loading spinner after the specified duration
  showWithDuration(duration: number = 0) {
    this.loadingSubject.next(true);

    // Automatically hide the loading spinner after the specified duration
    if (duration > 0) {
      timer(duration).pipe(take(1)).subscribe(() => {
        this.loadingSubject.next(false);
      });
    }
  }
  // End test 1

  // Test 1
  // New method to clear the localStorage item
  clearLocalStorage() {
    localStorage.removeItem('hasVisitedBefore');
  }
  // End test 1

}
