const searchInput =
document.getElementById(
    "searchInput"
);

const users =
document.querySelectorAll(
    ".user-card"
);

searchInput.addEventListener(
    "input",
    () => {

        const value =
        searchInput.value.toLowerCase();

        users.forEach(user => {

            const content =
            user.innerText.toLowerCase();

            if (content.includes(value)) {

                user.style.display =
                "flex";

            } else {

                user.style.display =
                "none";

            }

        });

    }
);

/* STATUS BUTTON */

const buttons =
document.querySelectorAll(
    ".status-button"
);

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const status =
            button.parentElement.querySelector(
                ".user-status"
            );

            if (
                status.classList.contains(
                    "user-status--active"
                )
            ) {

                status.classList.remove(
                    "user-status--active"
                );

                status.classList.add(
                    "user-status--inactive"
                );

                status.textContent =
                "Inativo";

                button.textContent =
                "Ativar";

                button.classList.remove(
                    "status-button--disable"
                );

                button.classList.add(
                    "status-button--enable"
                );

            } else {

                status.classList.remove(
                    "user-status--inactive"
                );

                status.classList.add(
                    "user-status--active"
                );

                status.textContent =
                "Ativo";

                button.textContent =
                "Desativar";

                button.classList.remove(
                    "status-button--enable"
                );

                button.classList.add(
                    "status-button--disable"
                );

            }

        }
    );

});