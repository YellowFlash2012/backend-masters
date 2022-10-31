const advancedRes = (model, populate) => async (req, res, next) => {
    let query;

    // copy req.query
    const reqQuery = { ...req.query };

    // fields to exclude from the search
    const removeFields = ["select", "sort", "page", "limit"];

    // loop over removeFields & delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // create query string
    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    // searching for bootcamps based on search queries
    query = model.find(JSON.parse(queryStr));

    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");

        query = query.select(fields);
    }

    // sort the resulsts of the search
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");

        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");
    }

    // pagination logic
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    if (populate) {
        query = query.populate(populate);
    }

    // executing the search by query
    const results = await query;

    // pagination results
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit: limit,
        };
    }

    if (!results) {
        throw new Error(`No ${results} found!`)
    }

    res.advancedRes = {
        success: true,
        count: results.length,
        pagination,
        data: results,
    };

    next();
}

export default advancedRes;