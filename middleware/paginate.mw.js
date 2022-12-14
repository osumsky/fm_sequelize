const MAX_LIMIT = 50;

module.exports.pagination = async (req, res, next) => {
  try {
    const {
      query: { limit, offset },
    } = req;
    req.pagination = {
      limit: limit > MAX_LIMIT || limit <= 0 ? MAX_LIMIT : limit,
      offset: offset <= 0 ? 0 : offset,
    };
    next();
  } catch (err) {
    next(err);
  }
};
