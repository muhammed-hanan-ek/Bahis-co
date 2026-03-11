import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit{

  fullText = "Bahis & CO";
  displayedText = "";
  index = 0;

  constructor(public loader: LoaderService) {}

  ngOnInit() {
    this.startTyping();
  }

  startTyping() {

    setInterval(() => {

      this.displayedText = this.fullText.slice(0, this.index);

      this.index++;

      if (this.index > this.fullText.length) {
        this.index = 1;
      }

    }, 200);

  }

}

