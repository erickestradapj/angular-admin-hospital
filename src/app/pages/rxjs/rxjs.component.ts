import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  filter,
  interval,
  map,
  Observable,
  retry,
  Subscription,
  take,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit, OnDestroy {
  public intervalSubs!: Subscription;

  constructor() {
    // this.returnObservable()
    //   .pipe(retry(2))
    //   .subscribe(
    //     (value) => console.log('Subs', value),
    //     (error) => console.warn('Error:', error),
    //     () => console.info('Obs finished')
    //   );

    this.intervalSubs = this.returnInterval().subscribe(console.log);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(100).pipe(
      // take(10),
      map((value) => value + 1),
      filter((value) => value % 2 !== 0)
    );
  }

  /* returnObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i got to the value of 2');
        }
      }, 1000);
    });
  } */
}
