import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/interfaces/userdetails';
import { GlobalstateService } from '../globalstate.service';
import { ReversegeoencodingService } from '../reversegeoencoding.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  headerSwitch:boolean=true;

  searchItem: string = '';

  itemImages = ['assets/item1.jpg', 'assets/item2.jpg', 'assets/item3.jpg','assets/item4.jpg', 'assets/item5.jpg', 'assets/item6.jpg', 'assets/item7.jpg', 'assets/item3.jpg','assets/item4.jpg', 'assets/item5.jpg', 'assets/item6.jpg', 'assets/item7.jpg', 'assets/item3.jpg','assets/item4.jpg', 'assets/item5.jpg', 'assets/item6.jpg', 'assets/item7.jpg',]

  constructor(private globalState: GlobalstateService, private currentLocation: ReversegeoencodingService) { }

  numberOfItemsInCart: number = 0
  currentUser!: UserDetails
  currentCity: string | undefined
  currentCountry: string | undefined
  postcode: string | undefined
  countryCode:string|undefined
  
  ngOnInit(): void {
    this.globalState.itemsInCartSubscription.subscribe(res => {
      this.numberOfItemsInCart = res.length
    })
    this.globalState.currentUserSubscription.subscribe(res => {
      this.currentUser = res
    })
    this.globalState.headerSwitchSubscription.subscribe(res => {
      this.headerSwitch = res
    })
    this.currentLocation.getCurrentLocation().subscribe((cordinates: GeolocationCoordinates) => {
      this.currentLocation.getReverseLocation(cordinates.latitude, cordinates.longitude).subscribe((res) => {
        this.currentCity = res.city
        this.currentCountry = res.countryName
        this.postcode = res.postcode
        this.countryCode=res.countryCode

      })
    })
  }
  search() {
    this.globalState.updateSearchedItem(this.searchItem)
  }
  searchByInput($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    const inputValue = inputElement.value; 
    this.globalState.updateSearchedItem(inputValue)
  }

}
