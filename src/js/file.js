import "./../scss/style.scss";
import { isFile } from "./utils/isFile";

// Example 1: File Format Validation on Blur
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.querySelector("#file");

    if (!fileInput) return;

    const fileWrapper = fileInput.closest(".c--form-group-a");
    let fileErrorSpan = fileWrapper?.querySelector(".c--form-error-a");

    // Create error span dynamically if it doesn't exist
    if (!fileErrorSpan && fileWrapper) {
        fileErrorSpan = document.createElement("span");
        fileErrorSpan.classList.add("c--form-error-a");
        fileErrorSpan.style.display = "none"; // Hide initially
        fileWrapper.appendChild(fileErrorSpan);
    }

    fileInput.addEventListener("blur", () => {
        const file = fileInput.files[0];

        const result = isFile({
            element: file,
            config: {
                allowedTypes: [ "image/png"],
                customMessage: {
                    type: "Only PNG files are allowed.",
                },
            },
            debug: true,
        });

        if (result.isValid) {
            fileWrapper?.classList.remove("c--form-group-a--error");
            fileWrapper?.classList.add("c--form-group-a--valid");
            if (fileErrorSpan) {
                fileErrorSpan.textContent = "";
                fileErrorSpan.style.display = "none";
            }
        } else {
            fileWrapper?.classList.add("c--form-group-a--error");
            fileWrapper?.classList.remove("c--form-group-a--valid");
            if (fileErrorSpan) {
                fileErrorSpan.textContent = result.errorMessage;
                fileErrorSpan.style.display = "block";
            }
        }
    });
});

// Example 2: File Size Validation on Submit
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.querySelector("#file2");
    const fileWrapper = fileInput ? fileInput.closest(".c--form-group-a") : null;
    const fileErrorSpan = fileWrapper ? fileWrapper.querySelector(".c--form-error-a") : null;
    const submitButton = document.querySelector("#submitFile");

    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission

            const file = fileInput.files[0];

            const result = isFile({
                element: file,
                config: {
                    maxSize: 1048576, // Max size 1MB
                    customMessage: {
                        size: "The file size must not exceed 1MB.",
                    },
                },
                debug: true,
            });

            if (result.isValid) {
                fileWrapper?.classList.add("c--form-group-a--valid");
                fileWrapper?.classList.remove("c--form-group-a--error");
                if (fileErrorSpan) {
                    fileErrorSpan.textContent = "";
                    fileErrorSpan.style.display = "none";
                }
                alert("File is valid!");
            } else {
                fileWrapper?.classList.add("c--form-group-a--error");
                fileWrapper?.classList.remove("c--form-group-a--valid");
                if (fileErrorSpan) {
                    fileErrorSpan.textContent = result.errorMessage;
                    fileErrorSpan.style.display = "block";
                }
            }
        });
    }
});
