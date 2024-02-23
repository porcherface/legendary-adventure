import { Application, Texture } from 'pixi.js';
import Card from '../sprite/card';
import View from './view'

class ApiView extends View {
    private app: Application; 

    constructor(app: Application) {
        const backgroundColor = 0x191970;
        super(app,backgroundColor);
        this.app = app;      
        console.log(this.app.renderer.type);

        const cardTexture = Texture.from("card_simple.png");
        const card = new Card(cardTexture);
        this.addChild(card);

    }

    override resize(width: number, height: number): void {
        width = width;
        height = height;
    }
}

export default ApiView;
