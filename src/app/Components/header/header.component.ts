import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
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
import { CdkOverlayOrigin, Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

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
    OverlayModule,MatBadgeModule, MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  @Output() menuToggle = new EventEmitter<void>();

  @ViewChild('notificationTpl') notificationTpl!: TemplateRef<any>;

  overlayRef!: OverlayRef;

  isOpenMenu: boolean = false;
  isOpenNav: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private dialog: MatDialog,
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) {}

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isOpenNav = !this.isOpenNav;
  }

  OpenMenu(event: Event) {
    event.stopPropagation();
    this.isOpenMenu = !this.isOpenMenu;
  }

  @HostListener('document:click', ['$event'])
  closeAll(event: any) {

    if (!event.target.closest('.menu-container')) {
      this.isOpenNav = false;
    }

    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpenMenu = false;
    }

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

    this.overlayRef.attach(
      new TemplatePortal(this.notificationTpl, this.vcr)
    );

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });

  }
}



