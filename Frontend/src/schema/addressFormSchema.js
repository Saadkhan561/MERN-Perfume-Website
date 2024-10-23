import * as yup from 'yup'

export const addressFormSchema = yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required")   
})