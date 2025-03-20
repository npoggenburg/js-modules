import { DOMUtils } from '../utils/DOMUtils';

export class MainMenu {
    private allowVisibilityChange: boolean;
    private header: HTMLElement;
    private prevScrollPos: number;
    private visible: boolean;
    private threshold: number;

    constructor() {
        this.header = document.querySelector('.header') as HTMLElement;
        this.prevScrollPos = window.scrollY;
        this.visible = true;
        this.threshold = 100;
        this.allowVisibilityChange = true;
        this.init();
    }

    private init(): void {
        DOMUtils.setGlobalCssVariable('header-height', `${document.querySelector<HTMLElement>('.header')?.offsetHeight}px`)

        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    private handleScroll(): void {
        const currentScrollPos = window.scrollY;
        const scrollDifference = Math.abs(currentScrollPos - this.prevScrollPos);

        if (!this.allowVisibilityChange && currentScrollPos > 0) {
            return;
        }

        // Only trigger hide/show if we've scrolled more than the threshold
        if (scrollDifference > this.threshold || currentScrollPos === 0) {
            if (currentScrollPos > 0 && currentScrollPos > this.prevScrollPos && this.visible) {
                this.hideHeader();
            } else if (currentScrollPos < this.prevScrollPos && !this.visible || currentScrollPos === 0) {
                this.showHeader();
            }
            document.dispatchEvent(new CustomEvent("headerSticky", { detail: { visible: this.visible } }));

            this.prevScrollPos = currentScrollPos;
        }
    }

    public showHeader(): void {
        this.header.style.transform = 'translateY(0)';
        this.visible = true;
        DOMUtils.setGlobalCssVariable('header-height', `${document.querySelector<HTMLElement>('.header')?.offsetHeight}px`);
    }

    public hideHeader(): void {
        this.header.style.transform = `translateY(-${this.header.offsetHeight}px)`;
        this.visible = false;
        DOMUtils.setGlobalCssVariable('header-height', `0px`)
    }

    public setAllowVisibilityChange(value: boolean): void {
        this.allowVisibilityChange = value;
    }

    public destroy(): void {
        window.removeEventListener('scroll', this.handleScroll);
    }
}