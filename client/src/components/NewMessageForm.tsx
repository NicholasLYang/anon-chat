import React from "react";
import { Formik, FormikActions, FormikProps } from "formik";
import { API_ROOT, HEADERS } from "../constants";

interface FormValues {
  text?: string;
}

interface Props {
  conversationId: string;
  userIndex: number;
}

const NewMessageForm: React.FunctionComponent<Props> = ({ conversationId, userIndex }) => {
  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={(
        values: FormValues,
        { setSubmitting, resetForm }: FormikActions<FormValues>
      ) => {
        if (values.text !== "") {
          fetch(`${API_ROOT}/conversations/${conversationId}/messages`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
              ...values,
              user_index: userIndex
            })
          }).then(() => {
            resetForm();
            setSubmitting(false)
          });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }: FormikProps<FormValues>) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.text}
          />
          {errors.text && touched.text && errors.text}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
