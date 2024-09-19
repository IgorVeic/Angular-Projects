import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  isVisible = false;

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    this.isVisible = scrollTop + clientHeight >= scrollHeight;
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }
}
