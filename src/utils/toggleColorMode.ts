const toggleMode = (darkMode: boolean): void => {
  if (darkMode === false) {
    document.body.classList.add("light-mode");
    document.querySelectorAll(".card").forEach((item) => {
      item.classList.add("cardLightMode");
    });
  } else {
    document.body.classList.remove("light-mode");
    document.querySelectorAll(".card").forEach((item) => {
      item.classList.remove("cardLightMode");
    });
  }
};

export default toggleMode;
