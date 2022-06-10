/* eslint-disable no-underscore-dangle */
import videojs from 'video.js';

const VjsButton = videojs.getComponent('Button');

class ShowPlaylistContainer extends VjsButton {
    constructor(player, options = {}) {
        super(player, options);

        this.controlText('Playlist');
        this.showingPlaylistContainer = false;
    }

    handleClick() {
        if (this.showingPlaylistContainer) {
            this.disposePlaylistContainer();
        } else {
            this.showPlaylistContainer();
        }

        this.showingPlaylistContainer = !this.showingPlaylistContainer;
    }

    disposePlaylistContainer() {
        this.player_.removeClass("show-vjs-playlist");
    }

    showPlaylistContainer() {
        this.player_.addClass("show-vjs-playlist");
    }
}
videojs.registerComponent('ShowPlaylistContainer', ShowPlaylistContainer);

function playlistContainerPlugin() {
    this.ready(() => {
        this.controlBar.addChild('ShowPlaylistContainer');
    });
};

videojs.registerPlugin('playlistContainer', playlistContainerPlugin);

export default playlistContainerPlugin;
