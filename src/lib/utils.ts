import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let lastWidth: number;

export const DOMLoaded = (callback: () => void) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

export const debounce = (callback: (...args: any[]) => void, delay: number) => {
  let timeout: number

  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => callback(...args), delay)
  }
}

export const handleResize = (callback: () => void) => {
  const debouncedCallback = debounce(callback, 300)
  window.addEventListener('resize', debouncedCallback)

  return () => {
    window.removeEventListener('resize', debouncedCallback)
  }
}

export const isTouchDevice = () => {
  return window.matchMedia('(pointer: coarse)').matches
}

export const hasViewportWidthChanged = (): boolean => {
  if (typeof window !== 'undefined') {
    const currentWidth = window.innerWidth;
    const widthChanged = currentWidth !== lastWidth;

    if (widthChanged) {
      lastWidth = currentWidth;
    }

    return widthChanged;
  }

  return false;
};

export const setAccordionHeight = (
  accordions: NodeListOf<HTMLDetailsElement>,
) => {
  const originalStates = Array.from(accordions).map(
    (accordion) => accordion.open,
  )

  accordions.forEach((accordion) => {
    accordion.classList.remove('accordion-item--animated')
    resetAccordionHeight(accordion)
    assignHeight(accordion)
  })

  accordions.forEach((accordion, index) => {
    accordion.open = originalStates[index]
    accordion.classList.add('accordion-item--animated')
  })
}

const resetAccordionHeight = (accordion: HTMLDetailsElement) => {
  accordion.style.removeProperty('--ac-accordion-item-expanded')
  accordion.style.removeProperty('--ac-accordion-item-collapsed')
}

const assignHeight = (accordion: HTMLDetailsElement) => {
  accordion.open = false
  const collapsedHeight = accordion.offsetHeight

  accordion.open = true
  const expandedHeight = accordion.scrollHeight

  accordion.style.setProperty(
    '--ac-accordion-item-expanded',
    `${expandedHeight}px`,
  )
  accordion.style.setProperty(
    '--ac-accordion-item-collapsed',
    `${collapsedHeight}px`,
  )
}