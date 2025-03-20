export class SectionMenu {
    private sectionMenuElement: HTMLElement | null;
    private sections: HTMLElement[];
    private menuItems: HTMLElement[] = [];
    private isAnchorScrolling: boolean;

    constructor(
        private readonly sectionMenuSelector: string = '[data-section-menu]',
        private readonly sectionSelector: string = '[data-section]'
    ) {
        this.sectionMenuElement = document.querySelector(this.sectionMenuSelector);
        this.sections = Array.from(document.querySelectorAll(this.sectionSelector));
        this.isAnchorScrolling = false;

        this.init();
    }

    private init(): void {
        if (!this.sectionMenuElement) return;

        this.buildSectionMenu();

        window.addEventListener("scrollend", () => {
            this.handleScrollEnd();
        });

        document.addEventListener('headerSticky', this.handleHeaderPositionChange.bind(this) as EventListener);
    }

    private handleClick(): void {
        if (!this.isAnchorScrolling) {
            console.log('Section Menu: CLICK');
            (window as any).app.mainMenu.hideHeader();
            (window as any).app.mainMenu.setAllowVisibilityChange(false);
            this.sectionMenuElement?.querySelector('nav')?.classList.toggle('force-top', true);
            this.isAnchorScrolling = true;
        }
    }

    private handleScrollEnd(): void {
        if (this.isAnchorScrolling) {
            console.log("Section Menu: handleScrollEnd()");
            (window as any).app.mainMenu.setAllowVisibilityChange(true);
            this.isAnchorScrolling = false;
        }
    }

    private handleHeaderPositionChange(e: CustomEvent): void {
        this.sectionMenuElement?.querySelector('nav')?.classList.toggle('force-top', !e.detail.visible)
    }

    private buildSectionMenu(): void {
        // Create menu container
        const menuContainer = document.createElement('nav');
        menuContainer.className = 'section-menu';

        // Create menu list
        const menuList = document.createElement('ul');
        menuList.className = 'section-menu-list';

        // Create menu items for each section
        this.sections.forEach((section) => {
            const sectionName = section.getAttribute('data-section');
            if (!sectionName) return;

            const menuItem = document.createElement('li');
            menuItem.className = 'section-menu-item';

            const menuLink = document.createElement('a');
            menuLink.href = `#${section.getAttribute('id')}`;
            menuLink.textContent = sectionName;
            menuLink.setAttribute('data-section-target', sectionName);
            menuLink.addEventListener('click', this.handleClick.bind(this));

            menuItem.appendChild(menuLink);
            menuList.appendChild(menuItem);
            this.menuItems.push(menuItem);
        });

        menuContainer.appendChild(menuList);
        this.sectionMenuElement?.prepend(menuContainer);
    }
}