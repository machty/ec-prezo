export default Component.extend({
  click() {
    this.set('status', 'Saving...');
    this.get('model').save().then(() => {
      // unsafe! might throw exception:
      // "calling set on destroyed object"
      this.set('status', 'Saved!');
    });
  }
});

