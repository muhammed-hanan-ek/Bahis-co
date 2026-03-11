import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  CdkOverlayOrigin,
  Overlay,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    OverlayModule,
    MatBadgeModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  @ViewChild('notificationTpl') notificationTpl!: TemplateRef<any>;
  @HostListener('document:click', ['$event'])
  isOpenMenu: boolean = false;
  isOpenNav: boolean = false;

  overlayRef!: OverlayRef;

  constructor(
    private elementRef: ElementRef,
    private dialog: MatDialog,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
  ) {}

  ngOnInit(): void {}

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isOpenNav = !this.isOpenNav;
  }

  closeAll(event: any) {
    if (!event.target.closest('.menu-container')) {
      this.isOpenNav = false;
    }

    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpenMenu = false;
    }
  }

  OpenMenu(event: Event) {
    event.stopPropagation();
    this.isOpenMenu = !this.isOpenMenu;
  }

  openNotifications(origin: CdkOverlayOrigin) {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin.elementRef)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(new TemplatePortal(this.notificationTpl, this.vcr));

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });
  }
}
