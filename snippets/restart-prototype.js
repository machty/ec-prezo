promise: null,
actions: {
  doStuff() {
    if (this.promise) {
      this.promise.cancel();
      // LOL WAT?
      // promises aren't cancelable
    }

    this.promise = doAsyncThing();
  }
}
