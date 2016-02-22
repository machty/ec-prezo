function processAll(values) {
  console.log("starting processing");
  for (let i = 0; i < values.length; ++i) {
    console.log(`processing index ${i}`);
    process(values[i]);
  }
  console.log("done processing");
}

