
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageCarousel } from '../../components/homepage-compoents/image-carousel/image-carousel';
import { HeroSearch } from '../../components/homepage-compoents/hero-search/hero-search';
import { StickContent } from '../../components/homepage-compoents/stick-content/stick-content';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],

  imports: [CommonModule, HeroSearch, ImageCarousel, StickContent],

})
export class Home {}
