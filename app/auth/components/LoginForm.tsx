import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div
      className="shadow-lg bg-white rounded h-18 p-10 mb-6 mt-2"
      // className="bg-blend-darken bg-[rgba(123,123,123,0.5)] rounded-2xl"
    >
      <h1 className="text-2xl">Login</h1>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Forgot your password?</a>
          </Link>
        </div>
      </Form>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "space-between",
          width: "120px",
          margin: "1rem auto 0",
          padding: ".5rem 1rem",
          borderTop: "1px solid black",
        }}
      >
        Or{" "}
        <Link href={Routes.SignupPage()}>
          <button
            className={
              "btn p-2 font-semibold bg-red-200 hover:bg-yellow-100 active:bg-[#1133b8] text-black active:text-white rounded transition-all active:text-white active:outline-none"
            }
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
