/*
// Number of Questions: 10, 20, 50, 100, unlimited (default 20)
// Difficulty: Easy (1 type), Medium (1-2 types), Hard (2 types)
*/


export type Settings = {
    numberOfQuestions?: number;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
}

const defaultSettings: Settings = {
    numberOfQuestions: 20,
    difficulty: 'Medium',
}

export const useSettings = () => {
    return defaultSettings;
}