import {useState} from 'react';

const useCopy = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (game_id: string) => {
    // Copy the content to clipboard
    navigator.clipboard
      .writeText(game_id)
      .then(() => {
        setCopied(true); // Set copied state to true on successful copy
        setTimeout(() => {
          setCopied(false); // Reset copied state after a brief delay
        }, 500); // Reset after 2 seconds
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };

  return {copied, onCopy: handleCopy};
};

export default useCopy;
