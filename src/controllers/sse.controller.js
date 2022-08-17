// response header for sever-sent events
const SSE_RESPONSE_HEADER = {
  Connection: "keep-alive",
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "X-Accel-Buffering": "no",
};

let clients = [];
let facts = [];
// Connected users (request object of each user) :
var users = {};

function sendEventsToAll(newFact) {
  clients.forEach((client) =>
    client.response.write(`data: ${JSON.stringify(newFact)}\n\n`)
  );
}

function getUserId(req) {
  // Note:
  // In reality, you should use userId stored in req.session,
  // but not URI parameter.
  return req.params.userId;
}

module.exports = {
  status: async (req, res, next) => res.json({ clients: clients.length }),
  events: async (req, res, next) => {
    try {
      let userId = getUserId(req);
      // Stores this connection
      users[userId] = req;

      // Create connection with client
      res.writeHead(200, SSE_RESPONSE_HEADER);

      // Data sending client
      let data = `data: ${JSON.stringify(facts)}\n\n`;
      // Send data
      res.write(data);

      const clientId = Date.now();
      const newClient = {
        id: clientId,
        userId: userId,
        response: res,
      };
      clients.push(newClient);

      // Interval loop
      let intervalId = setInterval(function () {
        console.log(`*** Interval loop. userId: "${userId}"`);
        // Creates sending data:
        data = {
          userId,
          users: Object.keys(users).length,
          // memoryUsage: process.memoryUsage()
          time: new Date().getTime(),
        };
        // Note:
        // For avoidance of client's request timeout,
        // you should send a heartbeat data like ':\n\n' (means "comment") at least every 55 sec (30 sec for first time request)
        // even if you have no sending data:
        if (!data) res.write(`:\n\n`);
        else res.write(`data: ${JSON.stringify(data)}\n\n`);
      }, 3000);
      // Note: Heatbeat for avoidance of client's request timeout of first time (30 sec)
      res.write(`:\n\n`);

      req.on("close", () => {
        let userId = getUserId(req);
        console.log(`${clientId} Connection closed with userId:: ${userId}`);
        clients = clients.filter((client) => client.id !== clientId);
        // Breaks the interval loop on client disconnected
        clearInterval(intervalId);
        // Remove from connections
        delete users[userId];
      });

      req.on("end", function () {
        let userId = getUserId(req);
        console.log(`*** End. userId: "${userId}"`);
      });
    } catch (error) {
      next(error);
    }
  },
  addFact: async (req, res, next) => {
    try {
      const newFact = req.body;
      facts.push(newFact);
      res.json(newFact);
      return sendEventsToAll(newFact);
    } catch (error) {
      next(error);
    }
  },
};
