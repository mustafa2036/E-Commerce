

export const globalError = (err, req, res, next) => {
    let code = err.statusCode || 500 // لو statusCode مش موجود ابعت
    res.status(err.statusCode).json({ error: "error", message: err.message, code: err.statusCode }) // دا العمدة بتاع المشاكل
}

// stack: شايلة كل تفاصيل Error