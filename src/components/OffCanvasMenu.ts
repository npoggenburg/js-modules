import { DOMUtils } from '../utils/DOMUtils';
import { ScrollLock } from '../utils/ScrollLock';

export class OffCanvasMenu {
    private toggleButton: HTMLElement;
    private closeButton: HTMLElement;
    private menu: HTMLElement;
    private backdrop: HTMLElement;
    private isOpen: boolean = false;

    constructor() {
        this.toggleButton = document.getElementById('offcanvas-toggle') as HTMLElement;
        this.menu = document.querySelector('.offcanvas-menu') as HTMLElement;
        this.closeButton = this.menu.querySelector('.close-button') as HTMLElement;
        this.backdrop = document.querySelector('.offcanvas-backdrop') as HTMLElement;

        this.init();
    }

    private init(): void {
        if (!this.toggleButton || !this.menu || !this.closeButton || !this.backdrop) return;

        this.toggleButton.addEventListener('click', () => this.toggleMenu());
        this.closeButton.addEventListener('click', () => this.closeMenu());
        this.backdrop.addEventListener('click', () => this.closeMenu());

        DOMUtils.registerEscKey(() => {
            if (this.isOpen) {
                this.closeMenu();
            }
        });

        // Initialize mobile dropdowns
        const mobileDropdowns = this.menu.querySelectorAll('.mobile-dropdown');
        mobileDropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('span') as HTMLElement;
            const submenu = dropdown.querySelector('.mobile-submenu') as HTMLElement;

            if (toggle && submenu) {
                toggle.addEventListener('click', () => {
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                });
            }
        });
    }

    private toggleMenu(): void {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }

    private openMenu(): void {
        this.menu.classList.add('open');
        this.backdrop.classList.add('show');
        this.menu.setAttribute('aria-hidden', 'false');
        ScrollLock.enable();
        this.isOpen = true;
    }

    private closeMenu(): void {
        this.menu.classList.remove('open');
        this.backdrop.classList.remove('show');
        this.menu.setAttribute('aria-hidden', 'true');
        ScrollLock.disable();
        this.isOpen = false;
    }
}