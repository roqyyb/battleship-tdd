const SoundManager = (() => {
  // const missedSound = new Audio("./src/sounds/missed.ogg");
  // const woundedSound = new Audio("./src/sounds/wounded.ogg");
  // const killedSound = new Audio("./src/sounds/killed.ogg");

  const playMissedSound = () => {
    new Audio("./src/sounds/missed.ogg").play();
  };
  const playWoundedSound = () => {
    new Audio("./src/sounds/wounded.ogg").play();
  };
  const playKilledSound = () => {
    new Audio("./src/sounds/killed.ogg").play();
  };

  return {
    playKilledSound,
    playMissedSound,
    playWoundedSound,
  };
})();

export default SoundManager;
