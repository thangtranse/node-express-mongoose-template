const createError = require("http-errors");

let clients = [];
let facts = [];

function sendEventsToAll(newFact) {
  clients.forEach((client) =>
    client.response.write(`data: ${JSON.stringify(newFact)}\n\n`)
  );
}

module.exports = {
  status: async (req, res, next) => res.json({ clients: clients.length }),
  events: async (req, res, next) => {
    try {
      const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      };
      res.writeHead(200, headers);

      const data = `data: ${JSON.stringify(facts)}\n\n`;

      res.write(data);

      const clientId = Date.now();

      const newClient = {
        id: clientId,
        response: res,
      };

      clients.push(newClient);

      req.on("close", () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter((client) => client.id !== clientId);
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
