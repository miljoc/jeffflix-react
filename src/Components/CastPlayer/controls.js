let playerController;

setTimeout(() => {
    playerController = new cast.framework.RemotePlayerController(
        new cast.framework.RemotePlayer(),
    );
}, 500);

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
