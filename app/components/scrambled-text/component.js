import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

// from http://stackoverflow.com/a/3943985/914123
function scramble(word) {
  var a = word.split(""),
  n = a.length;

  for(var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

export default Ember.Component.extend({
  tagName: '',
  text: null,
  scrambledText: null,
  startScrambling: task(function * () {
    let text = this.get('text');
    while (true) {
      let pauseTime = 140;
      while (pauseTime > 5) {
        this.set('scrambledText', scramble(text));
        yield timeout(pauseTime);
        pauseTime = pauseTime * 0.95;
      }
      this.set('scrambledText', text);
      if (!this.get('loop')) {
        return;
      }
      yield timeout(4000);
    }
  }).on('init'),

  loop: true,
});


