import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

function randomTimeout() {
  return timeout(500 + 3000 * Math.random());
}

const NUM_TOMSTERS = 5;
export default Ember.Component.extend({
  classNames: 'tomster-head',

  isShowingTomster: false,
  tomsterIndex: 0,

  tomsterHeadStyle: Ember.computed('isShowingTomster', 'tomsterIndex', function() {
    let isShowingTomster = this.get('isShowingTomster');
    let tomsterIndex = this.get('tomsterIndex');
    let s = `background-image: url(assets/images/tomster-${tomsterIndex}.png); top: ${isShowingTomster ? '-100' : '81'}px;`;
    return new Ember.Handlebars.SafeString(s);
  }),

  didInsertElement() {
    let scale = this.get('scale') || 1;
    this.$().css({
      transform: `scale(${scale})`,
      left: this.get('left'),
      top: this.get('top'),
    });
  },

  tomsterLoop: task(function * () {
    while (true) {
      this.set('tomsterIndex', Math.floor(Math.random() * NUM_TOMSTERS));
      yield randomTimeout();
      this.set('isShowingTomster', true);
      yield randomTimeout();
      this.set('isShowingTomster', false);
      yield randomTimeout();
    }
  }).on('init'),
});

