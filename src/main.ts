import { MainMenu } from './components/MainMenu';
import { LanguageMenu } from './components/LanguageMenu';
import { OffCanvasMenu } from './components/OffCanvasMenu';
import { SectionMenu } from './components/SectionMenu';

class App {
  private mainMenu: MainMenu;
  private languageMenu: LanguageMenu;
  private offCanvasMenu: OffCanvasMenu;
  private sectionMenu: SectionMenu;

  constructor() {

    // Then initialize UI components
    this.mainMenu = new MainMenu();
    this.languageMenu = new LanguageMenu();
    this.offCanvasMenu = new OffCanvasMenu();
    this.sectionMenu = new SectionMenu('[data-section-menu]', '[data-section]');
  };
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});