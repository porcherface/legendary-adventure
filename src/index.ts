import { Application } from 'pixi.js';
import SceneManager from './code/sceneManager';

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
});

// Adjust the size to fill the screen
app.renderer.resize(window.innerWidth, window.innerHeight);
app.ticker.add((delta) => {
    sceneManager.update(delta);
});

// Initialize the scene manager
const sceneManager = new SceneManager(app);
sceneManager.changeScene('AboutView'); // Starting scene

const navButtons = document.querySelectorAll('.nav-button');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sceneName = button.getAttribute('data-scene');
        if (sceneName) {
            sceneManager.changeScene(sceneName);
        }
    });
});

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    sceneManager.resize(); // Adjust current scene to new size if needed
});
