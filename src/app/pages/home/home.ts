import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageCarousel } from '../../components/homepage-compoents/image-carousel/image-carousel';
import { HeroSearch } from '../../components/homepage-compoents/hero-search/hero-search';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, HeroSearch, ImageCarousel],
})
export class Home {}
