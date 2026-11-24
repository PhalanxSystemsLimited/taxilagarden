// Material Symbols (outlined) used inside React islands, inlined at build time.
import close from '@material-symbols/svg-400/outlined/close.svg?raw';
import send from '@material-symbols/svg-400/outlined/send.svg?raw';
import chat from '@material-symbols/svg-400/outlined/chat.svg?raw';
import checkCircle from '@material-symbols/svg-400/outlined/check_circle.svg?raw';
import error from '@material-symbols/svg-400/outlined/error.svg?raw';
import add from '@material-symbols/svg-400/outlined/add.svg?raw';
import remove from '@material-symbols/svg-400/outlined/remove.svg?raw';
import fitScreen from '@material-symbols/svg-400/outlined/fit_screen.svg?raw';
import openInNew from '@material-symbols/svg-400/outlined/open_in_new.svg?raw';
import refresh from '@material-symbols/svg-400/outlined/refresh.svg?raw';

const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const ICONS = {
  close: inner(close),
  send: inner(send),
  chat: inner(chat),
  check_circle: inner(checkCircle),
  error: inner(error),
  add: inner(add),
  remove: inner(remove),
  fit_screen: inner(fitScreen),
  open_in_new: inner(openInNew),
  refresh: inner(refresh),
};

/**
 * @param {{ name: keyof typeof ICONS; size?: number; className?: string; flip?: boolean }} props
 */
export default function Icon({ name, size = 20, className = '', flip = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${flip ? 'flip-rtl' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}
