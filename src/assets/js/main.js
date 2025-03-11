// Scroll top
// @see https://tw-elements.com/docs/standard/components/scroll-back-to-top-button/
const scrolltop = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button

const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrolltop.classList.remove("hidden");
    } else {
        scrolltop.classList.add("hidden");
    }
    };
    const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// When the user clicks on the button, scroll to the top of the document
scrolltop.addEventListener("click", backToTop);
window.addEventListener("scroll", scrollFunction);
