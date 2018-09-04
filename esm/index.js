/*! (c) Andrea Giammarchi (ISC) */
/**
 * ISC License
 *
 * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
 * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
((dropClasses, forEach) => {
  customElements.define(
    'bulma-tile',
    class extends HTMLElement {
      static get observedAttributes() {
        return ['size', 'vertical'];
      }
      connectedCallback() {
        this.addEventListener('update', this);
        this.update();
      }
      handleEvent(event) {
        this[event.type]();
      }
      update() {
        const classes = ['tile'];
        const {nodeName} = this;
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
        if (this.parentNode.nodeName === nodeName) {
          const child = this.firstElementChild;
          if (child && child.nodeName !== nodeName) {
            classes.push('is-parent');
            forEach(
              this.children,
              child => child.classList.add('tile', 'is-child')
            );
          }
        } else {
          classes.push('is-ancestor');
          this.observer = new MutationObserver(records => {
            let update = false;
            forEach(
              records,
              record => {
                if (record.target.nodeName === nodeName) {
                  update = true;
                  forEach(
                    record.removedNodes,
                    target => {
                      if (target.nodeType === 1)
                        dropClasses(target);
                    }
                  );
                }
              }
            );
            if (update) {
              const evt = new CustomEvent('update');
              forEach(
                this.querySelectorAll(nodeName),
                tile => tile.dispatchEvent(evt)
              );
            }
          });
          this.observer.observe(this, {
            childList: true,
            subtree: true
          });
        }
        if (this.size)
          classes.push('is-' + this.size);
        if (this.hasAttribute('vertical'))
          classes.push('is-vertical');
        dropClasses(this);
        this.classList.add(...classes);
      }
    }
  );
})(
  el => {
    el.classList.remove(
      'tile',
      'is-ancestor',
      'is-parent',
      'is-child',
      'is-1', 'is-2', 'is-3',
      'is-4', 'is-5', 'is-6',
      'is-7', 'is-8', 'is-9',
      'is-10', 'is-11', 'is-12'
    );
  },
  (list, fn) => {
    const length = list.length;
    for (let i = 0; i < length; i++)
      fn(list[i]);
  }
);
export default customElements.get('bulma-tile');
