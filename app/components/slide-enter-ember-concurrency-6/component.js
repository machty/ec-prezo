import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET task-6-component
export default Ember.Component.extend({
  header: "Task Status",
  words: ['One', 'Two', 'Three'],

  myTask: task(function * () {
    this.set('header', "One");
    yield timeout(1000);
    this.set('header', "Two");
    yield timeout(1000);
    this.set('header', "Three");
  })
});
// END-SNIPPET

