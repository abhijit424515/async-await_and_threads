const { threadId } = require("node:worker_threads");

async function waiting(start, letter) {
  await fetch(`http://localhost:13000/${letter}`);
  console.log(
    `${letter} > THREAD_ID: ${threadId}, TIME: ${
      (new Date() - start) / 1000
    } secs`
  );
}

async function main() {
  console.log(`start > THREAD_ID: ${threadId}, TIME: 0.000 secs`);
  const start = new Date();
  await waiting(start, "alpha");
  await waiting(start, "beta");
}

main();
