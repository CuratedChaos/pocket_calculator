const calculator = document.querySelector(".calculator");
const title = document.querySelector(".calculator h1");
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.textContent;

        if (value === "AC") {
            expression = "";
            display.innerHTML = '<span class="placeholder">Hello</span>';
            return;
        }

        if (value === "C") {
            expression = expression.slice(0, -1);
            display.textContent = expression || "Hello";
            return;
        }

        if (value === "=") {
            if (expression === "") return;

            try {
                expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
                const result = eval(expression);
                expression = result.toString();
                display.textContent = expression;
            } catch {
                expression = "";
                display.textContent = "Error";
            }

            return;
        }

        expression += value;
        display.textContent = expression;
    });
});

title.addEventListener("mousedown", function(event) {
    const rect = calculator.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    function moveCalculator(event) {
        calculator.style.left = event.clientX - offsetX + "px";
        calculator.style.top = event.clientY - offsetY + "px";
        calculator.style.transform = "none";
    }

    function stopDragging() {
        document.removeEventListener("mousemove", moveCalculator);
        document.removeEventListener("mouseup", stopDragging);
    }

    document.addEventListener("mousemove", moveCalculator);
    document.addEventListener("mouseup", stopDragging);
});