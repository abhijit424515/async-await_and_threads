const {
  Worker,
  isMainThread,
  workerData,
  threadId,
} = require("worker_threads");

if (isMainThread) {
  // MAIN thread code
  console.log(`start > THREAD_ID: ${threadId}, TIME: 0.000 secs`);
  const start = new Date();

  function waitInWorker(route, start) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { route, start },
      });
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }

  Promise.all([waitInWorker("alpha", start), waitInWorker("beta", start)]);
} else {
  // WORKER thread code
  const { route, start } = workerData;

  async function waiting(start, route) {
    await fetch(`http://localhost:13000/${route}`);
    console.log(
      `${route} > THREAD_ID: ${threadId}, TIME: ${
        (new Date() - start) / 1000
      } secs`
    );
  }

  waiting(start, route);
}
