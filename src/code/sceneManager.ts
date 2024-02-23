import { Application, Container } from 'pixi.js';

import AboutView from './view/aboutView';
import SkillTreeView from './view/skilltreeView';
import ProjectsView from './view/projectsView';
import ApiView from './view/apiView';
import CanvasView from './view/canvasView';

// Import other views...

// Define an interface for the scenes mapping
interface Scenes {
    [key: string]: new (app: Application) => Container;
}

class SceneManager {
    private app: Application;
    private scenes: Scenes;
    private currentScene?: Container;

    constructor(app: Application) {
        this.app = app;
        this.scenes = {
            AboutView: AboutView,
            SkillTreeView: SkillTreeView,
            ProjectsView: ProjectsView,
            CanvasView:CanvasView,
            ApiView:ApiView,
            // Add other scenes...
        };
    }

    changeScene(sceneName: string): void {
        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
        }

        const Scene = this.scenes[sceneName];
        if (Scene) {
            this.currentScene = new Scene(this.app);
            this.app.stage.addChild(this.currentScene);
        }
    }
    
    resize(): void {
        // Resize current scene if necessary
        //if (this.currentScene && typeof this.currentScene['resize'] === 'function') {
        //    this.currentScene['resize'](window.innerWidth, window.innerHeight);
        //}
    }
}

export default SceneManager;
