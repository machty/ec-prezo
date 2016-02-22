export default function() {
  this.transition(
    this.toValue(function(toValue, fromValue) {
      return toValue.index < fromValue.index;
    }),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
}

