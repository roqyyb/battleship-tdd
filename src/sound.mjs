const SoundManager = (() => {
  const missedSound = new Audio("./sounds/missed.ogg");
  const woundedSound = new Audio("./sounds/wounded.ogg");
  const killedSound = new Audio("./sounds/killed.ogg");

  const playMissedSound = () => {
    new Audio("./sounds/missed.ogg").play();
  };
  const playWoundedSound = () => {
    new Audio("./sounds/wounded.ogg").play();
  };
  const playKilledSound = () => {
    new Audio("./sounds/killed.ogg").play();
  };

  return {
    playKilledSound,
    playMissedSound,
    playWoundedSound,
  };
})();

export default SoundManager;
