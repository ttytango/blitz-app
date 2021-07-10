import { AuthenticationError, useMutation, useRouter } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import changePassword from "app/auth/mutations/changePassword"
import { ChangePassword } from "app/auth/validations"
import SignupPage from "../pages/signup"

type ChangePasswordFormProps = {
  onSuccess?: () => void
}

export const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const [changePasswordMutation] = useMutation(changePassword)

  const initialValues = { currentPassword: "", newPassword: "" }

  return (
    <div className="shadow-md bg-gray-200 rounded h-18 p-2 sm:p-10 sm:width-300 mx-auto w-9/12 lg:w-4/12">
      <h1 className={"text-xl"}>Change Forum Password</h1>

      <Form
        className={"mt-4 mx-auto"}
        submitText="Change Password"
        schema={ChangePassword}
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            await changePasswordMutation(values)
            props.onSuccess?.()
            alert("Your password has been successfully updated")
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Your current password is incorrect" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField
          name="currentPassword"
          label="Current Password"
          placeholder="Current Password"
          type="password"
        />
        <LabeledTextField
          name="newPassword"
          label="New Password"
          placeholder="New Password"
          type="password"
        />
      </Form>
    </div>
  )
}

export default ChangePasswordForm
