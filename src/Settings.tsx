export type Mode = 'daily' | 'random';

export type Settings = {
    numberOfQuestions: number;
    includeDualTypes: boolean;
    mode: Mode;
}

export const defaultSettings: Settings = {
    numberOfQuestions: 20,
    includeDualTypes: true,
    mode: 'daily',
}

export function getInitialSettings(): Settings {
    // Hash params (#mode=daily) are preferred for shareable links because they
    // are never sent to the server, so they survive redirects (e.g. /repo → /repo/).
    // Query params (?mode=daily) work as a fallback when there is a trailing slash.
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const search = new URLSearchParams(window.location.search);
    const get = (key: string) => hash.get(key) ?? search.get(key);

    const result = { ...defaultSettings };

    const mode = get('mode');
    if (mode && (['daily', 'random'] as string[]).includes(mode)) {
        result.mode = mode as Mode;
    }

    const n = Number(get('numberOfQuestions'));
    if ([10, 20, 50, 100].includes(n)) {
        result.numberOfQuestions = n;
    }

    const dual = get('includeDualTypes');
    if (dual === 'true') result.includeDualTypes = true;
    if (dual === 'false') result.includeDualTypes = false;

    return result;
}
