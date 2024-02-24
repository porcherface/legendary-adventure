import { Container, Text, TextStyle, Graphics } from 'pixi.js';

class SkillNode extends Container {
    childrenNodes: SkillNode[] = []; 
    nodeName: string;
    lineGraphics: Graphics; // Dedicated Graphics object for lines

    constructor(name: string, x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.nodeName = name || "Unnamed Node";

        // Initialize the Graphics object for lines and add it as a child
        this.lineGraphics = new Graphics();
        this.addChild(this.lineGraphics);

    }

    addChildNode(node: SkillNode) {
        this.childrenNodes.push(node);
    }

    drawLinesToChildren() {
        //this.lineGraphics.clear(); // Clear the existing lines on the dedicated Graphics object
        this.lineGraphics.lineStyle(2, 0xffffff, 1);

        this.childrenNodes.forEach(child => {
            this.lineGraphics.moveTo(0, 0); // Start at the parent node's center
            this.lineGraphics.lineTo(child.x - this.x, child.y - this.y); // Draw line to the child node
        });
    }


    drawNodeGraphics() {
        const text = new Text(this.nodeName, this.setTextStyle());
        text.anchor.set(0.5, 0.5); // Anchor the text to its center
        text.position.set(0, 0); // Position the text at the center of the node
        const graphics = new Graphics();
        graphics.beginFill(0x6495ed);
        graphics.drawCircle(0, 0, 20); 
        graphics.endFill();
        this.addChild(graphics); 
        this.addChild(text);
    }

    setTextStyle() {
        const textStyle = new TextStyle({
            fontFamily: 'Calibri', // Font family
            fontSize: 13, // Size of the text
            fill: ['#ffffff', '#00ff99'], // Gradient from white to light green
            stroke: '#4a1850', // Outline color
            strokeThickness: 3, // Outline thickness
            dropShadow: true, // Enable drop shadow
            dropShadowColor: '#000000', // Drop shadow color
            dropShadowBlur: 4, // Drop shadow blur amount
            dropShadowAngle: Math.PI / 6, // Drop shadow angle
            dropShadowDistance: 3, // Drop shadow distance
        });
        return textStyle;
    }
}

export default SkillNode;