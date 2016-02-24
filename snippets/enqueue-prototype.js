promise: null,
actions: {
  doStuff() {
    this.promise =
      RSVP.resolve(this.promise)
          .then(doAsyncThing);
  }
}
