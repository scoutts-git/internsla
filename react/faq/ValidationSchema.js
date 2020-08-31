import * as Yup from "yup";

const faqValidationSchema = Yup.object().shape({
  question: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("A question is required"),
  answer: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("An answer is required"),
  categoryId: Yup.number().required("Required"),
});
export { faqValidationSchema };
