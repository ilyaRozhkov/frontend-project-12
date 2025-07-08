import * as yup from 'yup'

const getChannelValidation = (t, names) => {
  return yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('validation.requiredField'))
      .min(3, t('validation.nameLength'))
      .max(20, t('validation.nameLength'))
      .notOneOf(names, t('validation.withoutDoubles')),
  })
}

const getSignUpValidation = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .required(t('validation.requiredField'))
      .min(3, t('validation.nameLength'))
      .max(20, t('validation.nameLength')),
    password: yup
      .string()
      .required(t('validation.requiredField'))
      .min(6, t('validation.password')),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validation.repeatPassword')),
  })
}

export { getChannelValidation, getSignUpValidation }
