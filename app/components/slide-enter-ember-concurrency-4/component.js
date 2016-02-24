import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// BEGIN-SNIPPET task-4-component
export default Ember.Component.extend({
  header: "Loops? No Problem",
  words: ['One', 'Two', 'Three'],

  myTask: task(function * () {
    let words = this.get('words');
    for (let i = 0; i < words.length; ++i) {
      this.set('header', words[i]);
      yield timeout(1000);
    }
  })
});
// END-SNIPPET

