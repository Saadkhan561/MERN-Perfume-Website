import * as yup from 'yup'

export const sendEmailSchema = yup.object().shape({
    subject: yup.string().required("Subject is required!"),
    body: yup.string().required("Body is required!")
})