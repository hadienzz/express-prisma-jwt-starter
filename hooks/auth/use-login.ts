import { useFormik } from "formik"

export interface LoginResponse {
  status: string;
  message: string;
  data?: {

  }
}

const useLogin = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: () => {

        },
    })

    return {
        formik
    }
}

export default useLogin