import { writable } from 'svelte/store';

export const isMainMusicPaused = writable(false);
export const activeKpopTrack = writable<string | null>(null);
