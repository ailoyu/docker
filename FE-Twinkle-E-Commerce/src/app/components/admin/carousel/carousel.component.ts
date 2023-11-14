import { Component, Input, OnInit } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';


  interface CarouselImage {
    imageSrc: string;
    imageAlt: string;
    slideInterval?: number;
    objectPosition?: string; // Add this property
    contentType?: 'image' | 'video'; // Add this property
    videoSrc?: string; // Add this property to store video source
  }

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() images: CarouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;

  selectedIndex = 0;
  private autoSlideInterval: any;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  autoSlideImages(): void {
    this.autoSlideInterval = setInterval(() => {
      this.onNextClick();
    }, this.getCurrentSlideInterval());
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
    clearInterval(this.autoSlideInterval);
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
    clearInterval(this.autoSlideInterval);
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
    clearInterval(this.autoSlideInterval);
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  getCurrentSlideInterval(): number {
    const currentImage = this.images[this.selectedIndex];
    return currentImage?.slideInterval || 6000; // Default to 6 seconds if not specified
  }

  title = 'carousel';
  imagesnicexu: CarouselImage[] = [
    {
      imageSrc: './assets/videos/nike.mp4',
      imageAlt: 'nike1',
      slideInterval: 8000, // Set individual interval for this image
      // objectPosition: '0px 0px', // Only effect with background images and images      
      contentType: 'video',
      videoSrc: './assets/videos/nike.mp4', // Set the video source
    },
    {
      imageSrc: './assets/videos/converse.mp4',
      imageAlt: 'converse2',
      slideInterval: 10000, // Set individual interval for this image
      // objectPosition: '0px -40px',
      contentType: 'video',
      videoSrc: './assets/videos/converse.mp4', // Set the video source
    },
    {
      imageSrc: './assets/videos/adidas.mp4',
      imageAlt: 'adidas3',
      slideInterval: 10000, // Set individual interval for this image
      // objectPosition: '0px -40px',
      contentType: 'video',
      videoSrc: './assets/videos/adidas.mp4', // Set the video source
    },
    {
      imageSrc: './assets/videos/puma.mp4',
      imageAlt: 'puma4',
      slideInterval: 15000, // Set individual interval for this image
      // objectPosition: '0px -40px',
      contentType: 'video',
      videoSrc: './assets/videos/puma.mp4', // Set the video source
    },
    {
      imageSrc: './assets/videos/vans.mp4',
      imageAlt: 'vans5',
      slideInterval: 7700, // Set individual interval for this image
      // objectPosition: '0px -40px',
      contentType: 'video',
      videoSrc: './assets/videos/vans.mp4', // Set the video source
    },
  ];

  playVideo(index: number): void {
    const video = this.el.nativeElement.querySelectorAll('video')[index];
    if (video) {
      this.renderer.setProperty(video, 'muted', true); // Set muted property
      this.renderer.setProperty(video, 'autoplay', true); // Set autoplay property

      // Apply custom styles
      this.renderer.setStyle(video, 'display', 'block');
      this.renderer.setStyle(video, 'margin-top', '400px');
      this.renderer.setStyle(video, 'margin-bottom', '20px');

      video.play();
    }
  }
}
