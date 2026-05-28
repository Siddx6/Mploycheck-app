/**
 * Delay Middleware
 * Simulates slow API response when ?delay=ms is passed as query param
 * Example: GET /api/records?delay=3000  → waits 3 seconds before responding
 * Max allowed delay: 10000ms (10 seconds) to prevent abuse
 */
const delayMiddleware = (req, res, next) => {
  const delay = parseInt(req.query.delay, 10);

  if (delay && !isNaN(delay) && delay > 0) {
    const safeDelay = Math.min(delay, 10000); // cap at 10s
    console.log(`⏳ Delay middleware: waiting ${safeDelay}ms for ${req.path}`);
    setTimeout(next, safeDelay);
  } else {
    next();
  }
};

module.exports = delayMiddleware;