const maiorZIndex = () => {
  return Math.max(
    ...Array.from(document.querySelector("body *"), (el) => {
      parseFloat(window.getComputedStyle(el).zIndex);
    }).filter((zIndex) => {
      !Number.isNaN(zIndex);
    }),
    0
  );
};

