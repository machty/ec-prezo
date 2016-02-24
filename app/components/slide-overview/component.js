import Ember from 'ember';
import SlideComponent from '../slide';
import { task, timeout } from 'ember-concurrency';

export default SlideComponent.extend({
  myTask: task(function * (tracker) {
    tracker.start();
    try {
      // simulate async work
      yield timeout(1500);
    } finally {
      tracker.end();
    }
  }).enqueue(),
});

