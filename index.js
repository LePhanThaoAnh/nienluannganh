const server = require("./server");
const configs = require("./src/config/environment");
  
async function startServer() {
    try {
        let config = configs["development"];
        const PORT = config.port;
        const HOSTNAME = config.hostname;
        server.listen(PORT, HOSTNAME, () => {
            console.clear();
            console.log(`Website is running on port ${PORT}`);
            console.log(`Go to website: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}
startServer();
