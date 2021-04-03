exports.advanceQuerying = (model) => async (req, res, next) => {
    try {
        let query
        const reqQuery = { ...req.query }
        const removeFields = ["select", "page", "limit"]

        removeFields.forEach((param) => delete reqQuery[param])

        let queryStr = JSON.stringify(reqQuery)

        query = model.find(JSON.parse(queryStr))

        if (req.query.select) {
            const fields = req.query.select.split(",").join(" ")
            query = query.select(fields)
        }

        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 10
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const total = await model.countDocuments()

        query = query.skip(startIndex).limit(limit)

        const results = await query

        const pagination = {}

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            }
        }

        res.advanceQuerying = {
            status: true,
            count: results.count,
            pagination,
            data: results,
        }

        next()
    } catch (error) {
        res.status(500).json({
            error: "Unknown query parameter or maybe the server is dowm...",
        })
    }
}
