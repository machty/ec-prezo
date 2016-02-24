import Ember from 'ember';
import { task, events, subscribe } from 'ember-concurrency';

export default Ember.Component.extend({
  tagName: '',

  isShowing: false,
  appController: Ember.computed(function() {
    let owner = Ember.getOwner(this);
    return owner.lookup('controller:application');
  }),

  listenForNext: task(function * () {
    while (true) {
      let { index, preventDefault } = yield events(this.get('appController'), 'nextSlide');
      if (this.get('index') === index) {
        preventDefault();
        this.set('isShowing', true);
        return;
      }
    }
  }).on('init'),
});

