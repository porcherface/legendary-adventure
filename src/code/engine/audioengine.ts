

class AudioEngine {
    private tracks: Map<string, HTMLAudioElement> = new Map();
    private currentTrack: string | null = null;

    constructor() {

    }

    loadTrack(trackName: string, filePath: string): void {
        const audio = new Audio(filePath);
        this.tracks.set(trackName, audio);
    }

    playTrack(trackName: string, loop: boolean = false): void {
        if (this.currentTrack) {
            this.stopTrack(this.currentTrack);
        }
        const track = this.tracks.get(trackName);
        if (track) {
            track.loop = loop;
            track.play();
            this.currentTrack = trackName;
        }
    }

    stopTrack(trackName: string): void {
        const track = this.tracks.get(trackName);
        if (track) {
            track.pause();
            track.currentTime = 0;
        }
    }

}

export default AudioEngine