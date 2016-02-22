import Ember from 'ember';
import { task, timeout, subscribe, events } from 'ember-concurrency';

const BASE_WIDTH  = 900;
const BASE_HEIGHT = 500;

export default Ember.Component.extend({
  classNames: 'slide-container',

  viewportListener: task(function * () {
    this.updateContainerSize();
    yield subscribe(events(Ember.$(window), 'resize'), function * () {
      yield timeout(200);
      this.updateContainerSize();
    }).restartable();
  }).on('didInsertElement'),

  updateContainerSize() {
    let height = window.innerHeight;
    let width  = window.innerWidth;
    let baseRatio = BASE_WIDTH / BASE_HEIGHT;
    let ratio = width / height;

    let trans = (ratio < baseRatio) ?
      width / BASE_WIDTH :
      height / BASE_HEIGHT;

    this.$().css({
      height: BASE_HEIGHT,
      width: BASE_WIDTH,
      transform: ` translateX(-50%) translateY(-50%) scale(${trans})`,
    });
  }
});

