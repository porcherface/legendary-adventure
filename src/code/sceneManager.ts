import { Application } from 'pixi.js';

import AudioEngine from "./engine/audioengine";


import View from './view/view';
import AboutView from './view/aboutView';
import SkillTreeView from './view/skilltreeView';
import ProjectsView from './view/projectsView';
import ApiView from './view/apiView';
import CanvasView from './view/canvasView';

// Import other views...

// Define an interface for the scenes mapping
interface Scenes {
    [key: string]: new (app: Application) => View;
}

class SceneManager {
    private app: Application;
    private scenes: Scenes;
    private currentScene?: View;
    private audioEngine: AudioEngine;


    constructor(app: Application) {
        this.app = app;
        this.scenes = {
            AboutView: AboutView,
            SkillTreeView: SkillTreeView,
            ProjectsView: ProjectsView,
            CanvasView: CanvasView,
            ApiView:ApiView,
        };
        this.audioEngine = new AudioEngine();
        this.audioEngine.loadTrack('backgroundMusic', 'audio/Star_Wars_Visions_Village_Bride.mp3');
        this.audioEngine.playTrack('backgroundMusic', true); 
    }

    changeScene(sceneName: string): void {
        const htmlContent = document.getElementById('html-content');
        if (htmlContent) {
            htmlContent.style.display = 'none';
        }

        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
        }

        const Scene = this.scenes[sceneName];
        if (Scene) {
            this.currentScene = new Scene(this.app);
            this.app.stage.addChild(this.currentScene);
        }
    }
    
    update(delta: number): void {
        // Check if the current scene has an update method and call it
        if (this.currentScene && typeof (this.currentScene as any).update === 'function') {
            (this.currentScene as any).update(delta);
        }
    }

    resize(): void {
        // Resize current scene if necessary
        if (this.currentScene && typeof this.currentScene['resize'] === 'function') {
            this.currentScene['resize'](window.innerWidth, window.innerHeight);
        }
    }
}

export default SceneManager;
