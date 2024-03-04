import { Application } from 'pixi.js';
import View from './view';
import SkillNode from "../sprite/skillnode";
import { PhysicsEngine } from "../engine/physicsengine";

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
    private interactiveSprites: SkillNode[]; // Ensure this is declared
    private linkedNodes: [SkillNode, SkillNode][]; // Ensure this is declared and initialized
    private physicsEngine: PhysicsEngine; // Declare physicsEngine here

    constructor(app: Application) {
        const backgroundColor = 0x2F4F4F;

        super(app, backgroundColor);
        this.app = app;
        console.log(this.app.renderer.type);
        this.physicsEngine = new PhysicsEngine(); 
        this.skillNodes = {}; // Initialize skillNodes as an empty object
        this.loadSkills();
        this.interactiveSprites = []; // Initialize the array here
        this.linkedNodes = [];
    }


    async loadSkills() {
        const response = await fetch('json/skill_tree.json');
        const data = await response.json();

        // First pass: create SkillNode instances
        data.skills.forEach((skill: Skill) => {
            const node = new SkillNode(skill.name, skill.x, skill.y);
            this.skillNodes[skill.id] = node;
            this.interactiveSprites.push(node); // Add to interactiveSprites
            this.addChild(node);
        });

        // Second pass: establish parent-child relationships and store linked nodes
        data.skills.forEach((skill: Skill) => {
            if (skill.children) {
                skill.children.forEach(childId => {
                    const parentNode = this.skillNodes[skill.id];
                    const childNode = this.skillNodes[childId];
                    parentNode.addChildNode(childNode);
                    this.linkedNodes.push([parentNode, childNode]); // Store linked nodes
                });
            }
            this.skillNodes[skill.id].drawLinesToChildren();
        });

        // Draw node graphics
        data.skills.forEach((skill: Skill) => {
            this.skillNodes[skill.id].drawNodeGraphics();
        });
    }

    override update(delta: number) {
        this.physicsEngine.handleRangedInteractions(this.interactiveSprites, delta, this.linkedNodes);
    
        // Redraw lines to reflect updated positions
        Object.values(this.skillNodes).forEach(node => {
            node.drawLinesToChildren();
            this.addChild(node); // Ensure nodes are rendered above lines

        });


    }
    override resize(width: number, height: number): void {
        width = width;
        height = height;
    }


}

export default SkillTreeView;
