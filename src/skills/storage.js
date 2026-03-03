export function loadJSON(key, fallback = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        console.error(`Error loading JSON from localStorage for key "${key}"`, e);
        return fallback;
    }
}

export function saveJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error saving JSON to localStorage for key "${key}"`, e);
    }
}

const FAV_KEY = 'pandereta_cancionero_favoritos';

export function isFavoriteSong(songId) {
    const favs = loadJSON(FAV_KEY, []);
    return favs.includes(songId);
}

export function toggleFavoriteSong(songId) {
    const favs = loadJSON(FAV_KEY, []);
    const idx = favs.indexOf(songId);
    if (idx >= 0) {
        favs.splice(idx, 1);
    } else {
        favs.push(songId);
    }
    saveJSON(FAV_KEY, favs);
    return favs; // Devuelve la lista actualizada
}

export function getFavoriteSongs() {
    return loadJSON(FAV_KEY, []);
}

const PATTERNS_KEY = 'pandereta_user_patterns';

export function loadPatterns() {
    return loadJSON(PATTERNS_KEY, []);
}

export function savePattern(patternId, sequence, meta) {
    const patterns = loadPatterns();
    const newPattern = {
        id: patternId,
        sequence,
        meta: {
            ...meta,
            fecha: new Date().toISOString()
        }
    };

    const existingIdx = patterns.findIndex(p => p.id === patternId);
    if (existingIdx >= 0) {
        patterns[existingIdx] = newPattern;
    } else {
        patterns.push(newPattern);
    }

    saveJSON(PATTERNS_KEY, patterns);
    return patterns; // Devuelve la lista actualizada
}

export function deletePattern(patternId) {
    let patterns = loadPatterns();
    patterns = patterns.filter(p => p.id !== patternId);
    saveJSON(PATTERNS_KEY, patterns);
    return patterns;
}
