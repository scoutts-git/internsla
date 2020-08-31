import * as Yup from "yup";

const ContactUsValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().matches(
    /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})/,
    "Must input a valid email"
  ).required("Required"),
  message: Yup.string().required("Required")
});
export { ContactUsValidationSchema };
