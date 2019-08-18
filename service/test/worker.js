const {
  Worker
} = require('worker_threads');

const worker = new Worker('./app.js', { env: { test: '你好' } })