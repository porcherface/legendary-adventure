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
    private interactiveSprites: SkillNode[]; // Ensure this is declared
    private linkedNodes: [SkillNode, SkillNode][]; // Ensure this is declared and initialized

    constructor(app: Application) {
        const backgroundColor = 0x2F4F4F;
        super(app, backgroundColor);
        this.app = app;
        console.log(this.app.renderer.type);
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
    const k = 0.1; // Spring constant - adjust based on desired "stiffness"
    const equilibriumDistance = 100; // Desired distance between parent and child nodes

    this.linkedNodes.forEach(([parent, child]) => {
            // Calculate displacement from equilibrium position
            const dx = child.x - parent.x;
            const dy = child.y - parent.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const displacement = distance - equilibriumDistance;

            // Normalize displacement vector for direction
            const nx = dx / distance;
            const ny = dy / distance;

            // Calculate spring force based on displacement
            const fx = -k * displacement * nx;
            const fy = -k * displacement * ny;

            // Assuming mass = 1, acceleration = force
            // Update velocities based on acceleration and delta time
            child.velocity.x += fx * delta;
            child.velocity.y += fy * delta;

            // Optionally, add some damping to stabilize the system
            const damping = 0.98; // Damping factor close to but less than 1
            child.velocity.x *= damping;
            child.velocity.y *= damping;
        });

        // Update positions based on velocities
        this.interactiveSprites.forEach(node => {
            node.x += node.velocity.x * delta;
            node.y += node.velocity.y * delta;
        });

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
