import { PlaylistSpotifyDialog } from './dialogs/playlist-spotify/playlist-spotify.component';
import { ArtistSpotifyDialog } from './dialogs/artist-spotify/artist-spotify.component';
import { ReleaseContainerComponent } from './release/release-container/release-container.component';
import { ReleasePreviewComponent } from './release/release-preview/release-preview.component';
import { MusicTableComponent } from './music-table/music-table.component';
import { NgModule }     from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { EventPreviewComponent } from './event-preview/event-preview.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { CustomMaterialModule } from 'app/custom-material/custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports:  [ 
      CommonModule,
      RouterModule,
      CustomMaterialModule,
      LazyLoadImageModule,
      ReactiveFormsModule
    ],
    exports: [
      MusicTableComponent,
      EventPreviewComponent,
      ReleasePreviewComponent,
      ReleaseContainerComponent,
      ArtistSpotifyDialog,
      PlaylistSpotifyDialog,
      ReadMoreComponent
    ],
    declarations: [ 
      MusicTableComponent,
      EventPreviewComponent,
      ReleasePreviewComponent,
      ReleaseContainerComponent,
      ArtistSpotifyDialog,
      PlaylistSpotifyDialog,
      ReadMoreComponent
    ],
    entryComponents: [
      ArtistSpotifyDialog,
      PlaylistSpotifyDialog
    ]
  })
  export class SharedModule { }