export default function copyCurrentDay(text: string, copySuccessTip: string) {
  const alert = (message: string) => window.mdui.snackbar({
    message
  });

  const legacyClipboard: any = (window as any).clipboardData;
  if (legacyClipboard && legacyClipboard.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    alert(copySuccessTip);
    return legacyClipboard.setData("Text", text);

  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");  // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed. Let Fireblend know!", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
      alert(copySuccessTip);
    }
  }
}
