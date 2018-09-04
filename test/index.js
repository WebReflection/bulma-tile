const {Document, HTMLElement} = require('basichtml');
const document = new Document();
global.customElements = document.customElements;
global.HTMLElement = HTMLElement;
global.MutationObserver = class MutationObserver {
  constructor(fn) {
    this.fn = fn;
  }
  observe(node) {
    this.node = node;
  }
  disconnect() {
    this.node = null;
  }
};

require('../cjs');
document.body.innerHTML = `
<bulma-tile>
  <bulma-tile size=8 vertical>
    <bulma-tile>
      <bulma-tile vertical>
        <article class="notification is-primary">
          <p class="title">Vertical...</p>
          <p class="subtitle">Top tile</p>
        </article>
        <article class="notification is-warning">
          <p class="title">...tiles</p>
          <p class="subtitle">Bottom tile</p>
        </article>
      </bulma-tile>
      <bulma-tile>
        <article class="notification is-info">
          <p class="title">Middle tile</p>
          <p class="subtitle">With an image</p>
          <figure class="image is-4by3">
            <img src="http://bulma.io/images/placeholders/640x480.png">
          </figure>
        </article>
      </bulma-tile>
    </bulma-tile>
    <bulma-tile>
      <article class="notification is-danger">
        <p class="title">Wide tile</p>
        <p class="subtitle">Aligned with the right tile</p>
        <div class="content">
          <!-- Content -->
        </div>
      </article>
    </bulma-tile>
  </bulma-tile>
  <bulma-tile id="tall-tile">
    <article class="notification is-success">
      <div class="content">
        <p class="title">Tall tile</p>
        <p class="subtitle">With even more content</p>
        <div class="content">
          <!-- Content -->
        </div>
      </div>
    </article>
  </bulma-tile>
</bulma-tile>
`.trim();

console.assert(
  document.querySelectorAll('.tile').length ===
  document.querySelectorAll('bulma-tile').length &&
  document.querySelectorAll('bulma-tile').length > 2,
  'all tiles initialized'
);
