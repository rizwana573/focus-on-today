document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".goalInput");
    const progress = document.querySelector("progress");
   
    const checkboxes = document.querySelectorAll(".customCheckbox");
    const progressText = ["Raise the bar by completing your goals!", "Its a good beginning", "One more step ahead, keep going", "Whoa!, you have completed all the goals"];

    const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};

     let checkedGoals = Object.values(allGoals)
                            .filter(goal => goal.completed===true).length ;

     progress.setAttribute("value", (checkedGoals / checkboxes.length) * 100);
    document.querySelector(".progressVal").innerText = `${checkedGoals}/3 completed`;
    document.querySelector(".progressText").innerText = progressText[checkedGoals];    
        if(checkedGoals>0){
            document.querySelector(".error").style.display = "none";
        }               

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
            const allGoalsSet = [...inputs].every((input) => {
                return input.value;
            });


            if (allGoalsSet) {
                checkbox.parentElement.classList.toggle("completed");
                document.querySelector(".error").style.display = "none";
                const inputId = checkbox.nextElementSibling.id
                allGoals[inputId].completed = !allGoals[inputId].completed

                if (checkbox.parentElement.classList.contains("completed") && checkedGoals <= checkboxes.length) {
                    checkedGoals++;
                    //console.log(checkedGoals);
                    progress.setAttribute("value", (checkedGoals / checkboxes.length) * 100);
                    document.querySelector(".progressVal").innerText = `${checkedGoals}/3 completed`;
                    document.querySelector(".progressText").innerText = progressText[checkedGoals];
                } else {
                    checkedGoals--;
                    //console.log(checkedGoals);
                    progress.setAttribute("value", (checkedGoals / checkboxes.length) * 100);
                    document.querySelector(".progressVal").innerText = `${checkedGoals}/3 completed`;
                    document.querySelector(".progressText").innerText = progressText[checkedGoals];
                }
                localStorage.setItem('allGoals', JSON.stringify(allGoals))

            } else {
                document.querySelector(".error").style.display = "block";
            }
            if (checkbox.parentElement.classList.contains("completed")) {
                console.log(checkbox.parentElement.querySelector("input"))
                checkbox.parentElement.querySelector("input").disabled = true;
            } else {
                checkbox.parentElement.querySelector("input").disabled = false;
            }
        });
    });
    inputs.forEach((input) => {
        if (allGoals[input.id]) {
            input.value = allGoals[input.id].name;
            if (allGoals[input.id].completed) {
                input.parentElement.classList.add('completed');
            }
        }

        input.addEventListener("focus", () => {
            document.querySelector(".error").style.display = "none";
        });

        input.addEventListener("input", () => {
            if (allGoals[input.id] && allGoals[input.id].completed) {
                //console.log("when goals are completed");
                input.value = allGoals[input.id].name;
                return;
            }
            if (allGoals[input.id]) {
                //console.log("when inputs are present");
                allGoals[input.id].name = input.value;
            }
            else {
               // console.log("when inputs are not present");
                allGoals[input.id] = {
                    name: input.value,
                    completed: false,
                }
            }
            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        });
    });


    let headerHeight = document.querySelector("header").offsetHeight;
    let footerHeight = document.querySelector("footer").offsetHeight;
    let viewportHeight = window.innerHeight;

    let calcHeight = viewportHeight - (footerHeight + headerHeight) - 15;

    document.querySelector("main").style.minHeight = `${calcHeight}px`;
});
