import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

function randomTimeout() {
  return timeout(500 + 3000 * Math.random());
}

const IMAGES = [
  "assets/images/tomster-0.png",
  "assets/images/tomster-1.png",
  "assets/images/tomster-2.png",
  "assets/images/tomster-3.png",
  "assets/images/tomster-4.png",
  "assets/images/tomster-5.png",
];


export default Ember.Component.extend({
  classNames: 'tomster-head',

  isShowingTomster: false,
  tomsterIndex: 0,

  tomsterHeadStyle: Ember.computed('isShowingTomster', 'tomsterIndex', function() {
    let isShowingTomster = this.get('isShowingTomster');
    let tomsterIndex = this.get('tomsterIndex');
    let s = `background-image: url(${IMAGES[tomsterIndex]}); top: ${isShowingTomster ? '-100' : '81'}px;`;
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

  // BEGIN-SNIPPET tomster-loop
  // from the tomster-head component
  tomsterLoop: task(function * () {
    while (true) {
      this.set('tomsterIndex', Math.floor(Math.random() * IMAGES.length));
      yield randomTimeout();
      this.set('isShowingTomster', true);
      yield randomTimeout();
      this.set('isShowingTomster', false);
      yield randomTimeout();
    }
  }).on('init'),
  // END-SNIPPET

  click() {
    this.sendAction('clicked');
  },
});

