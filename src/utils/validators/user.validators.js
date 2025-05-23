import { body } from "express-validator";

const UserValidator = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long"),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long"),

    body("mobileNumber")
        .trim()
        .notEmpty()
        .withMessage("Mobile number is required")
        .isLength({ min: 10 })
        .withMessage("Mobile number must be at least 10 characters long"),



    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
];

export {
    UserValidator
};
