isRunning: false,
actions: {
  doStuff() {
    if (this.isRunning) { return; }
    this.set('isRunning', true);

    doAsyncThing().finally(() => {
      this.set('isRunning', false);
    });
  }
}
