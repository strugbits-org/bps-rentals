import * as yup from 'yup';

const contactFormSchema = yup.object().shape({
  first_name_3469: yup.string().required('First name is required'),
  last_name_425e: yup.string().required('Last name is required'),
  email_d74b: yup.string().email('Invalid email').required('Email is required'),
  long_answer_e038: yup.string().required('Message is required'),
});

export default contactFormSchema;