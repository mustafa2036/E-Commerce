

export const globalError = (err, req, res, next) => {
    let errorCode = err.statusCode || 500 // لو statusCode مش موجود ابعت
    res.status(errorCode).json({ error: "error", message: err.message, code: errorCode }) // دا العمدة بتاع المشاكل
}

// stack: شايلة كل تفاصيل Error