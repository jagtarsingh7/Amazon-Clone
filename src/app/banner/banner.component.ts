import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class BannerComponent implements OnInit{

  backgroundImages=['assets/banner1.jpg','assets/banner2.jpg','assets/banner3.jpg']

  ngOnInit(): void {
    
    setInterval(()=>{
      this.count++
      if(this.count==3)
      {
        this.count=-1
      }
    },4000)
  }

  count:number=-1
}
