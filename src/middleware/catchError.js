

// 1-- Create function CatchError & Send globalError العمدة بتاع المشاكل
export const catchError = (callback) => {
    return (req, res, next) => { // بترجعلي function middleware مكونة من (req, res, next)
        callback(req, res, next).catch(err => { // بنادي علي callback وابعتله pramter مكون من (req, res, next)
            // res.json({ err })
            next(err);
        })
    }
}