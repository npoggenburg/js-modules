import { DOMUtils } from '../utils/DOMUtils';

export class LanguageMenu {
    private toggle: HTMLElement;
    private dropdown: HTMLElement;
    private languageButtons: NodeListOf<HTMLButtonElement>;
    private isOpen: boolean = false;

    constructor() {
        this.toggle = document.querySelector('.language-toggle') as HTMLElement;
        this.dropdown = document.querySelector('.language-dropdown') as HTMLElement;
        this.languageButtons = document.querySelectorAll('.language-dropdown button');

        this.init();
    }

    private init(): void {
        if (!this.toggle || !this.dropdown) return;

        this.toggle.addEventListener('click', () => this.toggleDropdown());

        this.languageButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeDropdown();
            });
        });

        DOMUtils.registerClickOutside(this.toggle.parentElement as HTMLElement, () => {
            if (this.isOpen) {
                this.closeDropdown();
            }
        });
    }

    private toggleDropdown(): void {
        this.isOpen ? this.closeDropdown() : this.openDropdown();
    }

    private openDropdown(): void {
        this.dropdown.style.display = 'block';
        this.toggle.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
    }

    private closeDropdown(): void {
        this.dropdown.style.display = 'none';
        this.toggle.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
    }
}