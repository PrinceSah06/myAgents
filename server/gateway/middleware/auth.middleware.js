import redis from "../../shared/redis/redis.js";

const   protect = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(400).json({
        message: "session not found ",
      });
    }

    const session = await redis.get(`session-${sessionId}`);

    if (!session) {
      return res.status(400).json({
        message: "Session Expired",
      });
    }

    req.user = JSON.parse(session);

    next();
  } catch (error) {
    console.log("Middelware Error :", error);
    return res.status(500).json({ message: "Unable to validate session" });
  }
};


 export default protect

