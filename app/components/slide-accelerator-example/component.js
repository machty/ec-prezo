import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET slide-accelerator
export default Ember.Component.extend({
  num: 0,
  incrementBy: task(function * (inc) {
    let speed = 400;
    while (true) {
      this.incrementProperty('num', inc);
      yield timeout(speed);
      speed = Math.max(50, speed * 0.8);
    }
  }),
});
// END-SNIPPET

