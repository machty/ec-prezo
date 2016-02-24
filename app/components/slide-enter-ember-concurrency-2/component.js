import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET task-1-component
export default Ember.Component.extend({
  header: "Introducing: Tasks",

  myTask: task(function * () {
    this.set('header', "One");
    yield timeout(1000);
    this.set('header', "Two");
    yield timeout(1000);
    this.set('header', "Three");
  })
});
// END-SNIPPET

