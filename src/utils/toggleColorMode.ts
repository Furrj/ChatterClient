const toggleMode = (): void => {
  document.body.classList.toggle("light-mode");
  document.querySelectorAll(".card").forEach((item) => {
    item.classList.toggle("cardLightMode");
  })
};

export default toggleMode;
