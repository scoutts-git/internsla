import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})/,
      "Must input a valid email"
    )
    .required("Please enter your email "),
  password: Yup.string().required("Please enter your password")
});

export { loginValidationSchema };
