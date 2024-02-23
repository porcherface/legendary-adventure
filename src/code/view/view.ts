import { Application, Container, Graphics } from 'pixi.js';

class View extends Container{

    constructor(app: Application, backgroundColor: number) {
        super();

        const background = new Graphics();
        background.beginFill(backgroundColor);
        background.drawRect(0, 0, app.screen.width, app.screen.height);
        background.endFill();
        this.addChildAt(background, 0);
    }
    resize(width: number, height: number): void {
        const background = this.getChildAt(0) as Graphics;
        background.width = width;
        background.height = height;
    }

}

export default View;
