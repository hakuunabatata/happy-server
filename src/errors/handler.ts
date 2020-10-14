import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
    [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        console.log(`👩‍🏫  Some errors ocurred in validation`)

        let errors: ValidationErrors = {}

        error.inner.forEach(err => {
            errors[err.path] = err.errors
        })

        console.error(errors)

        return res.status(400).json({ message: 'Validation fails', errors })
    }

    console.log(`🚑 Some error ocurred`)
    console.error(error)

    return res.status(500).json({ message: 'Internal Server Error' })
}

export default errorHandler
