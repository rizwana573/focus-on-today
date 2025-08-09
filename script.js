document.addEventListener("DOMContentLoaded", () => {
    let inputs = document.querySelectorAll(".goalInput");
    inputs.forEach((input) => {
        input.addEventListener("change", () => {
            const container = input.closest(".goalContainer");
            //const checkbox = container.querySelector(".round");
            const setGoalsCount = Array.from(inputs).filter(
                (input) => input.value.trim() !== ""
            ).length;

            if (input.value.trim() !== "") {
                container.classList.add("active");
                document.querySelector(".error").style.display = "none";
                document.querySelector(
                    ".progressText"
                ).innerText = `Keep going, you have set ${setGoalsCount} goals.`;
                document.querySelector(
                    ".inspiringText"
                ).innerText = `Keep going, you are making great progress.`;
            } else {
                container.classList.remove("active");
                if (setGoalsCount == 0) {
                    document.querySelector(".progressText").innerText = `Raise the bar by completing your goals.`;
                    document.querySelector(".error").style.display = "block";
                }
            }
        });

        let checkboxes = document.querySelectorAll(".goalCheckbox");
        let progress = document.querySelector("progress");
        checkboxes.forEach((checkbox) => {
            const container = checkbox.closest(".goalContainer");
            checkbox.addEventListener("change", () => {
                const checkedCount = Array.from(checkboxes).filter(
                    (cb) => cb.checked
                ).length;

                const step = 100 / checkboxes.length;
                const progressValue = Math.round(checkedCount * step);
                progress.setAttribute("value", progressValue);
                if (checkbox.checked && !container.classList.contains("completed")) {
                    container.classList.add("completed");
                } else {
                    container.classList.remove("completed");
                }
                if (checkedCount === checkboxes.length) {
                    document.querySelector(".progressText, .inspiringText").innerText = "Hurray! you have completed all your goals today."
                }
            });
        });
    });

      let headerHeight = document.querySelector("header").offsetHeight;
      let footerHeight = document.querySelector("footer").offsetHeight;
      let viewportHeight = window.innerHeight;

      let calcHeight = viewportHeight - (footerHeight+headerHeight)- 15;

      document.querySelector("main").style.minHeight = `${calcHeight}px`;
});
