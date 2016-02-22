export default Component.extend({
  click() {
    this.set('status', 'Saving...');
    this.get('model').save().then(() => {
      if (this.isDestroyed) { return; }
      this.set('status', 'Saved!');
    });
  }
});

