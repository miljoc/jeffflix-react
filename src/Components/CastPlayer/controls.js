const playerController = new cast.framework.RemotePlayerController(
    new cast.framework.RemotePlayer(),
);

const PlayerControls = {
    playOrPause() {
        playerController.playOrPause();
    },
    muteOrUnmute() {
        playerController.muteOrUnmute();
    },
    stop() {
        playerController.stop();
    },
};

export default PlayerControls;
