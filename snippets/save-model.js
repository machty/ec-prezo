export default Component.extend({
  click() {
    this.set('status', 'Saving...');
    this.get('model').save().then(() => {
      // unsafe! might throw exception:
      // "calling est on destroyed object"
      this.set('status', 'Saved!');
    });
  }
});

