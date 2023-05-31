import { Directive, DirectiveBinding } from "vue";

type FollowedHtmlElement = HTMLElement & {
  clickOutsideEvent: (event: MouseEvent) => void;
};

const clickOutside: Directive = {
  beforeMount(el: FollowedHtmlElement, binding: DirectiveBinding<() => void>) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el: FollowedHtmlElement) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
export default clickOutside;
