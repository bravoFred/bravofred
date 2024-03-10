if (location !== '/') {
setLocation('/');
} else {
// if not in portals, go to about me
portalsActive.current = false;
aboutMeActive.current = true;
}
