function processAll(values) {
  console.log("starting processing");
  let i = 0;
start:
  if (i === values.length) {
    console.log("done processing");
    return;
  }
  console.log(`processing index ${i}`);
  process(values[i]);
  i++;
  goto 'start';
}

