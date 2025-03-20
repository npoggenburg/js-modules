export class ScrollLock {
    static enable(): void {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    }

    static disable(): void {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }
}