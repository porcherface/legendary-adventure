import { Application } from 'pixi.js';
import View from './view'

class ApiView extends View {
    private app: Application; 

    constructor(app: Application) {
        const backgroundColor = 0x191970;
        super(app,backgroundColor);
        this.app = app;      
        console.log(this.app.renderer.type);


    }

    override resize(width: number, height: number): void {
        width = width;
        height = height;
    }
}

export default ApiView;
