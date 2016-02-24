import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

function * waitAMoment(tracker) {
  tracker.start();
  try {
    // simulate async work
    yield timeout(1500);
  } finally {
    tracker.end();
  }
}

// BEGIN-SNIPPET task-modifiers-enqueue
export default Ember.Component.extend({
  myTask: task(waitAMoment).enqueue(),
});
// END-SNIPPET

