// Get the button
const topButton = document.getElementById("btn-back-to-top");
const bottomButton = document.getElementById("btn-back-to-bottom");

if (topButton) {
  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      topButton.classList.remove("hidden");
    } else {
      topButton.classList.add("hidden");
    }
  };
  const obs = new IntersectionObserver(bottomItem => {
    if (bottomItem[0]?.intersectionRatio > 0) {
      bottomButton.classList.add("hidden");
    } else bottomButton.classList.remove("hidden");
  });
  obs.observe(document.querySelector("footer"));
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToBottom = () => {
    window.scrollTo({ top: document.body.clientHeight, behavior: "smooth" });
  };
  // When the user clicks on the button, scroll to the top of the document
  topButton.addEventListener("click", backToTop);

  bottomButton.addEventListener("click", backToBottom);
  window.addEventListener("scroll", scrollFunction);
}
