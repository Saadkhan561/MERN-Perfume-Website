import * as yup from 'yup'

export const sendEmailSchema = yup.object().shape({
    subject: yup.string().required("Subject is required!"),
    trackingId: yup.number().required("Tracking ID is required!")
})