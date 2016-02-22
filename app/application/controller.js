import Ember from 'ember';
import SlideComponent from 'ec-prezo/components/slide';

const { computed } = Ember;

export default Ember.Controller.extend({
  queryParams: ['slide'],
  slide: 'home',

  slides: [
    "home",
    "intro",
    "hello",
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
        next
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
});

