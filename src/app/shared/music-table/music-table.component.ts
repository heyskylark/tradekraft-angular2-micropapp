import { Component, OnInit, Input } from '@angular/core';

import { MusicService } from './../../services/music.service';

import { Song } from './../../release/song';

@Component({
    selector: 'music-table',
    templateUrl: './music-table.component.html'
})
export class MusicTableComponent implements OnInit {
    @Input() songs: Song[];

    private currentSongLoaded: Song;
    private paused: boolean;

    private pauseSubscription;
    private songSubscription;

    constructor(private musicService: MusicService) { 
        this.paused = true;
    }

    ngOnInit() {
        this.pauseSubscription = this.musicService.pauseChange.subscribe((paused) => { 
            this.paused = paused; 
        });
        
        this.songSubscription = this.musicService.songChange.subscribe((song) => { 
            this.currentSongLoaded = song; 
            this.checkIfSongPlaying(this.currentSongLoaded);
        });

        this.paused = this.musicService.getPausedState();
        this.currentSongLoaded = this.musicService.getSongPlaying();
    }

     ngOnDestroy() {
        this.pauseSubscription.unsubscribe();
        this.songSubscription.unsubscribe();
    }

    playSong(songs: Song[], songIndex: number) {
        let song = songs[songIndex];

        if (this.checkIfSongPlaying(song)) {
            this.musicService.pausePlay();
        } else if (this.currentSongLoaded && this.currentSongLoaded.slug === song.slug) {
            this.musicService.pausePlay();
        } else {
            this.musicService.load(songs, songIndex);
        }
    }

    checkIfSongPlaying(song: Song): boolean {
        if (!this.paused && this.currentSongLoaded.slug === song.slug) {
            return true;
        }

        return false;
    }
}