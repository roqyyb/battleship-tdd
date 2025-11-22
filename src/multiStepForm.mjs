const placementForms = document.querySelectorAll(".placement-form");
let currentFormId = 0;

function hideAllForms() {
  document.getElementById("placement-control").style.display = "none";
  placementForms.forEach((f) => f.classList.add("hidden"));
}

function showCurrentForm() {
  //   console.log(placementForms.length);

  placementForms.forEach((form) => {
    if (form.id == currentFormId) {
      form.classList.remove("hidden");
    } else {
      form.classList.add("hidden");
    }
  });
}

function getCurrentFormId() {
  return currentFormId;
}

function incCurrentFormId() {
  return currentFormId++;
}

function getCurrentOrientation() {
  const oBtn = document.querySelector("#o-btn" + getCurrentFormId());
  const orientation = oBtn.textContent.match(/ver/) ? "v" : "h";

  //   console.log("current orien");

  return orientation;
}

function getCurrentShipDetails() {
  const ships = [5, 4, 3, 3, 2];
  //   const currentForm = document.querySelector("form#"+currentFormId);

  //   console.log({ orientation });
  const orientation = getCurrentOrientation();

  return {
    currentShip: ships[getCurrentFormId()],
    orientation,
  };
}

// showCurrentForm();

// console.log(getCurrentShipDetails());

export {
  incCurrentFormId,
  getCurrentFormId,
  showCurrentForm,
  getCurrentShipDetails,
  hideAllForms,
};
