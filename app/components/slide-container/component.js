import Ember from 'ember';
import { task, timeout, subscribe, events, race } from 'ember-concurrency';

const BASE_WIDTH  = 900;
const BASE_HEIGHT = 500;

export default Ember.Component.extend({
  currentSlide: null,
  progress: null,

  classNames: 'slide-container',

  viewportListener: task(function * () {
    this.updateContainerSize();
    yield subscribe(events(Ember.$(window), 'resize'), function * () {
      yield timeout(200);
      this.updateContainerSize();
    }).restartable();
  }).on('didInsertElement'),

  updateContainerSize: Ember.observer('progress', function() {
    let height = window.innerHeight;
    let width  = window.innerWidth;
    let baseRatio = BASE_WIDTH / BASE_HEIGHT;
    let ratio = width / height;

    let trans = (ratio < baseRatio) ?
      width / BASE_WIDTH :
      height / BASE_HEIGHT;

    let color = `hsl(${this.get('progress')*180}, 100%, 95%)`;

    this.$().css({
      backgroundColor: color,
      height: BASE_HEIGHT,
      width: BASE_WIDTH,
      transform: ` translateX(-50%) translateY(-50%) scale(${trans})`,
    });
  }),

  click: function(ev) {
    if (Ember.$(ev.target).closest('a,button').length === 0) {
      this.sendAction('advance');
    }
  },
});

