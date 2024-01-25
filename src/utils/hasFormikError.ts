import { FormikErrors, FormikTouched } from 'formik'

/** TODO: add this to all places using hasError function
 * Check if a field has an error.
 *
 * @param name - The name of the field.
 * @param touched - The object with all touched fields.
 * @param errors - The object with all errors.
 */
export function hasFormikError<T>(name: keyof T, touched: FormikTouched<T>, errors: FormikErrors<T>): boolean {
  return !!touched[name] && !!errors[name]
}
