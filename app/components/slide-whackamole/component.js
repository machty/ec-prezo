import Ember from 'ember';

export default Ember.Component.extend({
  showCode: false,
  actions: {
    toggleCode() {
      this.toggleProperty('showCode');
    }
  }
});

