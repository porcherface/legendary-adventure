import { Application, Texture } from 'pixi.js';
import Card from '../sprite/card';
import View from './view'

class AboutView extends View {
    private app: Application; 

    constructor(app: Application) {
        const backgroundColor = 0x00416A;
        super(app,backgroundColor);
        this.app = app;      

        const cardTexture = Texture.from("card_simple.png");
        const card = new Card(cardTexture);
        
        card.x = this.app.screen.width / 2 - card.width / 2; // Center horizontally
        card.y = this.app.screen.height / 2 - card.height / 2; // Center vertically
        this.addChild(card);
        
        
    }

    override resize(width: number, height: number): void {
        width = width;
        height = height;
    }
}

export default AboutView;
