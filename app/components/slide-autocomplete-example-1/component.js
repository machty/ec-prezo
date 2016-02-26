import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const $ = Ember.$;
const GITHUB_URL = "https://api.github.com/search/repositories";

// BEGIN-SNIPPET autocomplete-1
const DEBOUNCE_MS = 250;
export default Ember.Component.extend({
  searchRepo: task(function * (term) {
    if (Ember.isBlank(term)) { return []; }

    yield timeout(DEBOUNCE_MS);
    let url = `${GITHUB_URL}?q=${term}`;
    let json = yield $.getJSON(url);
    return json.items;
  }).restartable(),
});
// END-SNIPPET

