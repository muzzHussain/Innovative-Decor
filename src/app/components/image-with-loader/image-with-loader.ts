import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-image-with-loader',
  imports: [],
  templateUrl: './image-with-loader.html',
  styleUrl: './image-with-loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageWithLoader {
  src=input.required<string>();
  alt=input.required<string>();
  imageClass=input<string>();

  isLoading=signal(true);

  onLoad(){
    this.isLoading.set(false)
  }
}
