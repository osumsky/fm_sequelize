const MAX_LIMIT = 50;
module.exports = async (req, res, next) => {
  try {
    const {
      query: { limit, offset },
    } = req;
    console.log(limit, offset);
    req.pagination = {
      limit: limit > MAX_LIMIT || limit <= 0 || limit === undefined ? MAX_LIMIT : limit,
      offset: offset <= 0 ? 0 : offset,
    };
    next();
  } catch (error) {
    next(error);
  }
};
