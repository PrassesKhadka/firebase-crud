import { useCallback, useState } from "react";

type TcopiedValue = string;
interface IreturnUseCopyToClipboard {
  copyFunction: (text: string[]) => Promise<boolean>;
}

export function useCopyToClipboard(): IreturnUseCopyToClipboard {
  let copyText: TcopiedValue = "";

  const copyFunction = async (textArray: string[]) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }
    try {
      if (textArray.length === 1) {
        copyText = textArray[0];
      } else {
        textArray.forEach((text, index) => {
          if (index === textArray.length - 1) copyText += text;
          else copyText += `${text},`;
        });
      }
      await navigator.clipboard.writeText(copyText);
      copyText = "";
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      return false;
    }
  };

  return { copyFunction };
}
