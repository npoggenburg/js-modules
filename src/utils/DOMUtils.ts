export class DOMUtils {
    static registerClickOutside(element: HTMLElement, callback: () => void): void {
        document.addEventListener('click', (event: MouseEvent) => {
            if (!element.contains(event.target as Node)) {
                callback();
            }
        });
    }

    static registerEscKey(callback: () => void): void {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                callback();
            }
        });
    }

    static setGlobalCssVariable(variableName: string, value: string): void {
        document.documentElement.style.setProperty(`--${variableName}`, value);
    }

    static debounce(func: Function, delay: number) {
        let timer: number;
        return function (...args: any[]) {
            clearTimeout(timer);
            timer = window.setTimeout(() => func(...args), delay);
        };
    }
}