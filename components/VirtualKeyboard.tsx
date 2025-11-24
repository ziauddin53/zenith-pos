
import React, { useState, useEffect, useRef } from 'react';

// Define XMarkIcon locally as it's missing from ICONS in some contexts or to avoid circular deps
const XMarkIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const KEYS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', 'Enter'],
  ['Space']
];

const VirtualKeyboard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputTarget, setInputTarget] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is an input or textarea and is NOT read-only
      if ((target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && !target.getAttribute('readonly')) {
        setInputTarget(target as HTMLInputElement | HTMLTextAreaElement);
        setIsVisible(true);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
        // If clicking the keyboard itself, do nothing (prevent close)
        if (keyboardRef.current && keyboardRef.current.contains(e.target as Node)) {
            return;
        }
        // If clicking the active input, do nothing (keep open)
        if (inputTarget && e.target === inputTarget) {
            return;
        }
        // Otherwise close keyboard
        setIsVisible(false);
    }

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputTarget]);

  const handleKeyPress = (key: string) => {
    if (!inputTarget) return;

    const start = inputTarget.selectionStart || 0;
    const end = inputTarget.selectionEnd || 0;
    const value = inputTarget.value;

    let newValue = value;
    let newCursorPos = start;

    if (key === 'Backspace') {
      if (start === end && start > 0) {
        newValue = value.slice(0, start - 1) + value.slice(start);
        newCursorPos = start - 1;
      } else {
        newValue = value.slice(0, start) + value.slice(end);
        newCursorPos = start;
      }
    } else if (key === 'Enter') {
       // For textarea, add newline. For inputs, usually submit form or do nothing visually
       if(inputTarget.tagName === 'TEXTAREA') {
           newValue = value.slice(0, start) + '\n' + value.slice(end);
           newCursorPos = start + 1;
       } else {
           // Trigger enter key event programmatically if needed, or just hide keyboard
           setIsVisible(false);
           return; 
       }
    } else if (key === 'Space') {
      newValue = value.slice(0, start) + ' ' + value.slice(end);
      newCursorPos = start + 1;
    } else {
      const char = key; // Can add shift logic later
      newValue = value.slice(0, start) + char + value.slice(end);
      newCursorPos = start + 1;
    }

    // Update React State by triggering a native input event
    // This is crucial because just setting .value doesn't trigger React's onChange handler
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    
    if (nativeInputValueSetter) {
        nativeInputValueSetter.call(inputTarget, newValue);
    } else {
        inputTarget.value = newValue;
    }

    const event = new Event('input', { bubbles: true });
    inputTarget.dispatchEvent(event);

    // Restore focus and cursor position so typing can continue
    inputTarget.focus();
    inputTarget.setSelectionRange(newCursorPos, newCursorPos);
  };

  if (!isVisible) return null;

  return (
    <div ref={keyboardRef} className="fixed bottom-0 left-0 right-0 bg-neutral-200 dark:bg-neutral-900 border-t border-neutral-300 dark:border-neutral-700 p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[9999]">
      <div className="flex justify-end mb-1">
          <button onClick={() => setIsVisible(false)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600"><XMarkIcon className="w-5 h-5"/></button>
      </div>
      <div className="flex flex-col gap-1 max-w-5xl mx-auto">
        {KEYS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => {
                let widthClass = "w-10 sm:w-14"; // default key width
                if(key === 'Space') widthClass = "w-64 sm:w-80";
                if(key === 'Backspace' || key === 'Enter') widthClass = "w-16 sm:w-24 bg-neutral-300 dark:bg-neutral-600";

                return (
                    <button
                        key={key}
                        onMouseDown={(e) => { e.preventDefault(); handleKeyPress(key); }} // Prevent focus loss on click
                        className={`${widthClass} h-10 sm:h-12 rounded bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-600 active:bg-neutral-300 dark:active:bg-neutral-500 font-semibold text-sm sm:text-base transition-colors select-none`}
                    >
                        {key === 'Backspace' ? '⌫' : key}
                    </button>
                )
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
