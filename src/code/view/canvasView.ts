import { Application } from 'pixi.js';
import View from './view'

class CanvasView extends View {
    private app: Application; 

    constructor(app: Application) {
        const backgroundColor = 0x232B2B;
        super(app,backgroundColor);
        this.app = app;      
        console.log(this.app.renderer.type);
        this.showHtmlContent();
    }

    async showHtmlContent() {
        try {
            const response = await fetch('html/canvas.html');
            const htmlString = await response.text();
            
            const htmlContent = document.getElementById('html-content');
            if (htmlContent) {
                htmlContent.innerHTML = htmlString; 
                htmlContent.style.display = 'block';
            }
        } catch (error) {
            console.error('Failed to load HTML content:', error);
        }
    }
    hideHtmlContent() {
        const htmlContent = document.getElementById('html-content');
        if (htmlContent) {
            htmlContent.style.display = 'none'; // Hide the div
        }
    }
    override resize(width: number, height: number): void {
        width = width;
        height = height;
    }
}

export default CanvasView;
