import Ember from 'ember';
import SlideComponent from 'ec-prezo/components/slide';
import { task, subscribe, events } from 'ember-concurrency';

const { computed } = Ember;
const LEFT = 37;
const RIGHT = 39;

export default Ember.Controller.extend({
  queryParams: ['slide'],
  slide: 'home',

  slides: [
    "home",
    "dali",
    "dali-tomster",
    "overview",
  ],

  indexedSlides: computed('slides', function() {
    let slides = this.get('slides');
    let indexedSlides = [];
    for (let i = 0; i < slides.length; ++i) {
      let name = slides[i];
      let prev = slides[i-1];
      let next = slides[i+1];
      let componentName = `slide-${name}`;
      this.registerAndValidateSlide(componentName);
      indexedSlides.push({
        componentName,
        name,
        prev,
        next,
        index: i,
      });
    }
    return indexedSlides;
  }),

  currentSlide: computed('slide', function() {
    let name = this.get('slide');
    let indexedSlides = this.get('indexedSlides');
    return indexedSlides.findBy('name', name) || indexedSlides[0];
  }),

  registerAndValidateSlide(componentName) {
    let container = Ember.getOwner(this);
    let componentClassName = `component:${componentName}`;
    let ComponentClass = container._lookupFactory(componentClassName);
    let template = container._lookupFactory(`template:components/${componentName}`);
    Ember.assert(`Couldn't resolve template for ${componentName}`, !!template);
    if (!ComponentClass) {
      container.register(componentClassName, SlideComponent);
    }
  },

  keyboardListener: task(function * () {
    yield subscribe(events(Ember.$(document.body), 'keydown'), function * (ev) {
      let { keyCode } = ev;
      let destination;
      if (keyCode === LEFT) {
        destination = this.get('currentSlide.prev');
      } else if (keyCode === RIGHT) {
        destination = this.get('currentSlide.next');
      }

      if (destination) {
        this.set('slide', destination);
      }
    });
  }).on('init')
});

