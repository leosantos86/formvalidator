let FormValidator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll("input");

        FormValidator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = FormValidator.checkInput(input);
            if (check !== true) {
                send = false;
                FormValidator.showError(input, check);
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute("data-rules");

        if (rules !== null) {
            rules = rules.split("|");
            for (let k in rules) {
                let rDetails = rules[k].split("=");
                switch (rDetails[0]) {
                    case "required":
                        if (input.value == "") {
                            return "Campo não pode ser vazio.";
                        }
                        break;
                    case "min":
                        if (input.value.length < rDetails[1]) {
                            return (
                                "Senha precisa ter pelo menos " +
                                rDetails[1] +
                                " caracteres."
                            );
                        }
                        break;
                    case "email":
                        if (input.value != "") {
                            let regex =
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return "E-mail digitado não é válido.";
                            }
                        }
                        break;
                    case "phone":
                        if (input.value != "") {
                            let phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
                            if (!phoneRegex.test(input.value)) {
                                return "Número de celular não é válido.";
                            }
                        }
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = "#FF0000";

        let errorElement = document.createElement("div");
        errorElement.classList.add("error");
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.nextElementSibling);

        input.focus();
        if (input.type === "text" || input.type === "email" || input.type === "password") {
            input.select();
        }
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = "";
        }

        let errorElements = document.querySelectorAll(".error");
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    },
    formatPhone: (event) => {
        let input = event.target;
        let value = input.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.substring(0, 11);
        }

        if (value.length > 0) {
            value = '(' + value;
        }
        if (value.length > 3) {
            value = value.substring(0, 3) + ') ' + value.substring(3);
        }
        if (value.length > 10) {
            value = value.substring(0, 10) + '-' + value.substring(10);
        }

        input.value = value;
    }
};

let form = document.querySelector(".formvalidator");
form.addEventListener("submit", FormValidator.handleSubmit);

let phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", FormValidator.formatPhone);