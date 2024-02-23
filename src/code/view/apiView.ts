import { Application, Container, Texture } from 'pixi.js';
import Background from '../sprite/background';
import Card from '../sprite/card';

class ApiView extends Container {
    private app: Application; // Add this line to declare the app property

    constructor(app: Application) {
        super();
        this.app = app;
        console.log(this.app.renderer.type);
        // When creating a new Background or Card, you need to pass a Texture. Here's an example:
        const backgroundTexture = Texture.from("mandel_stars.png");
        const background = new Background(backgroundTexture);
        this.addChild(background);

        const cardTexture = Texture.from("wavy.png");
        const card = new Card(cardTexture);
        // Position and set up the card
        this.addChild(card);

        // Add more elements as needed
    }

    // Optionally, include a resize method to adjust elements when the window size changes
    resize(width: number, height: number): void {
        width = width;
        height = height;
        // Adjust background, cards, etc. based on the new width and height
    }
}

export default ApiView;
