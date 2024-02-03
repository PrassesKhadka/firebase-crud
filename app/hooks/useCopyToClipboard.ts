import { useCallback, useState } from "react";

type TcopiedValue = string;
interface IreturnUseCopyToClipboard {
  copiedText: TcopiedValue;
  copyFunction: (text: string[]) => Promise<boolean>;
}

export function useCopyToClipboard(): IreturnUseCopyToClipboard {
  const [copiedText, setCopiedText] = useState<TcopiedValue>("");

  const copyFunction = useCallback(async (textArray: string[]) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }
    try {
      textArray.forEach(async (text) => {
        setCopiedText(text);
        console.log(copiedText);
      });
      await navigator.clipboard.writeText(copiedText);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText("");
      return false;
    }
  }, []);

  return { copiedText, copyFunction };
}
