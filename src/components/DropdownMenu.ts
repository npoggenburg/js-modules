import { DOMUtils } from '../utils/DOMUtils';

export class DropdownMenu {
    private toggle!: HTMLElement;
    private menu!: HTMLElement;
    private isOpen: boolean = false;

    constructor(containerSelector: string) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        this.toggle = container.querySelector('.dropdown-toggle') as HTMLElement;
        this.menu = container.querySelector('.dropdown-menu') as HTMLElement;

        this.init();
    }

    private init(): void {
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });

        DOMUtils.registerClickOutside(this.toggle.parentElement as HTMLElement, () => {
            if (this.isOpen) {
                this.closeMenu();
            }
        });
    }

    public toggleMenu(): void {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }

    public openMenu(): void {
        this.menu.style.display = 'block';
        this.toggle.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
    }

    public closeMenu(): void {
        this.menu.style.display = 'none';
        this.toggle.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
    }

    public isMenuOpen(): boolean {
        return this.isOpen;
    }
}