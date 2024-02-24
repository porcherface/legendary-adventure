import { Application } from 'pixi.js';
import View from './view';
import SkillNode from "../sprite/skillnode";

interface Skill {
    id: string;
    name: string;
    x: number;
    y: number;
    children?: string[];
}

class SkillTreeView extends View {
    private app: Application;
    private skillNodes: { [id: string]: SkillNode }; // Declare skillNodes here

    constructor(app: Application) {
        const backgroundColor = 0x2F4F4F;
        super(app, backgroundColor);
        this.app = app;
        console.log(this.app.renderer.type);
        this.skillNodes = {}; // Initialize skillNodes as an empty object
        this.loadSkills();
    }

    async loadSkills() {
        const response = await fetch('json/skill_tree.json');
        const data = await response.json();

        data.skills.forEach((skill: Skill) => {
            const node = new SkillNode(skill.name, skill.x, skill.y);
            this.skillNodes[skill.id] = node; 
            this.addChild(node);
        });
        // Second pass: establish parent-child relationships
        data.skills.forEach((skill: Skill) => {
            if (skill.children) {
                skill.children.forEach(childId => {
                    const parentNode = this.skillNodes[skill.id];
                    const childNode = this.skillNodes[childId];
                    parentNode.addChildNode(childNode);

                });
    
            }
            this.skillNodes[skill.id].drawLinesToChildren();
        });
        data.skills.forEach((skill: Skill) => {
            this.skillNodes[skill.id].drawNodeGraphics();
        });
    }
    override resize(width: number, height: number): void {
        width = width;
        height = height;
    }
    override update(delta: number) {
        console.log(delta);
        Object.values(this.skillNodes).forEach(node => {
            node.drawLinesToChildren(); // Redraw lines on the dedicated Graphics object
        });
        Object.values(this.skillNodes).forEach(node => {
            this.addChild(node); // This should place the node graphics on top of the lines
        });
    }

}

export default SkillTreeView;
