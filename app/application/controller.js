import Ember from 'ember';
import SlideComponent from 'ec-prezo/components/slide';
import { task, subscribe, events } from 'ember-concurrency';

const { computed } = Ember;
const LEFT = 37;
const RIGHT = 39;
const SPACEBAR = 32;

export default Ember.Controller.extend(Ember.Evented, {
  queryParams: ['slide'],
  slide: 'home',

  slides: [
    "home",
    "dali",
    "dali-tomster",
    "ec-intro-1",
    "ec-intro-2",
    "structured-programming-1",
    "structured-programming-2",
    "js-structured-programming-1",
    "js-structured-programming-2",
    "js-structured-programming-3",
    "js-structured-programming-4",
    "js-structured-programming-5",
    "js-structured-programming-6",
    "preventing-concurrency-1",
    "preventing-concurrency-2",
    "whackamole",
    "structured-concurrency-1",
    "structured-concurrency-2",
    "enter-ember-concurrency-1",
    "enter-ember-concurrency-2",
    "enter-ember-concurrency-3",
    "enter-ember-concurrency-4",
    "enter-ember-concurrency-5",
    "enter-ember-concurrency-6",
    "things-that-suck-1",
    "what-about-concurrency-1",
    "what-about-concurrency-2",
    "what-about-concurrency-3",
    "what-about-concurrency-4",
    "what-about-concurrency-5",
    "what-about-concurrency-6",
    "task-modifiers-1",
    "task-modifiers-2",
    "task-modifiers-3",
    "task-modifiers-4",
    "task-modifiers-5",
    "task-modifiers-6",
    "task-modifiers-7",
    "things-that-rock-1",
    "accelerator-example",
    "autocomplete-example-1",
    "autocomplete-example-2",
    "many-examples",
    "advanced-topics",
    "summary",
    "go-alone",
    "thank-you",
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

  progress: computed('currentSlide', function() {
    let slide = this.get('currentSlide');
    return slide.index / (this.slides.length - 1);
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

  index: 0,
  keyboardListener: task(function * () {
    yield subscribe(events(Ember.$(document.body), 'keydown'), function * (ev) {
      let { keyCode } = ev;
      let destination;
      if (keyCode === LEFT) {
        destination = this.get('currentSlide.prev');
        if (destination) {
          this.set('index', 0);
          this.set('slide', destination);
        }
      } else if (keyCode === RIGHT || keyCode === SPACEBAR) {
        this.advance();
      }
    });
  }).on('init'),

  advance() {
    let destination = this.get('currentSlide.next');
    document.getSelection().removeAllRanges();
    let prevented = false;
    let proceedEvent = {
      preventDefault() {
        let oldPrevented = prevented;
        prevented = true;
        return !oldPrevented;
      },
      index: this.index,
    };
    this.trigger('nextSlide', proceedEvent);
    Ember.run.next(() => {
      if (!prevented && destination) {
        this.set('index', 0);
        this.set('slide', destination);
      } else {
        this.incrementProperty('index');
      }
    });
  },
});

