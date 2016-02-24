import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET what-about-concurrency-1
export default Ember.Component.extend({
  header: "Managing Concurrency",

  myTask: task(function * () {
    this.set('header', "One");
    yield timeout(1000);
    this.set('header', "Two");
    yield timeout(1000);
    this.set('header', "Three");
  })
});
// END-SNIPPET

