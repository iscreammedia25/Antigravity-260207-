const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

const mapping = {
    'c onst': 'const',
    'co nst': 'const',
    'con st': 'const',
    'f unction': 'function',
    'fu nction': 'function',
    'fun ction': 'function',
    'r eturn': 'return',
    're turn': 'return',
    'ret urn': 'return',
    'i f': 'if',
    'e lse': 'else',
    'l et': 'let',
    'v ar': 'var',
    'phas eContainer': 'phaseContainer',
    'phaseC ontainer': 'phaseContainer',
    'booksD ata': 'booksData',
    'booksDa ta': 'booksData',
    'renderB ooks': 'renderBooks',
    'renderHero': 'renderHero',
    'isH istoryMode': 'isHistoryMode',
    'curr entPhase': 'currentPhase',
    'currentP hase': 'currentPhase',
    'curr entModalBookId': 'currentModalBookId',
    'renderR eadPhase': 'renderReadPhase'
};

Object.keys(mapping).forEach(key => {
    const regex = new RegExp(key.replace(/ /g, '\\s+'), 'g');
    content = content.replace(regex, mapping[key]);
});

// Also fix common splitting of keywords at the start of lines or after punctuation
content = content.replace(/\bc\s+onst\b/g, 'const');
content = content.replace(/\bf\s+unction\b/g, 'function');
content = content.replace(/\br\s+eturn\b/g, 'return');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Mass cleanup complete.');
