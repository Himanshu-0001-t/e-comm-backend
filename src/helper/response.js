class Response {
    static success(res, data = {}, message = 'Success', statusCode = 200) {
        res.status(statusCode).json({
            status: 'success',
            message,
            data,
        });
    }

    static error(res, message = 'Error', statusCode = 400, error = null) {
        res.status(statusCode).json({
            status: 'error',
            message,
            error,
        });
    }

    static validationError(res, error = "somthing went wrong", message = 'Validation Error', statusCode = 422) {
        res.status(statusCode).json({
            status: 'fail',
            message,
            error,
        });
    }

    static notFound(res, error = 'Not Found', statusCode = 404) {
        res.status(statusCode).json({
            status: 'error',
            error,
        });
    }

    static unauthorized(res, message = 'Unauthorized', statusCode = 401) {
        res.status(statusCode).json({
            status: 'error',
            message,
        });
    }
}

export default Response
