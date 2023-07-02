const hexToName = new Map<string, string>([
    ['#25262B', 'dark'],
    ['#868E96', 'gray'],
    ['#FA5252', 'red'],
    ['#E64980', 'pink'],
    ['#BE4BDB', 'grape'],
    ['#7950F2', 'violet'],
    ['#4C6EF5', 'indigo'],
    ['#228BE6', 'blue'],
    ['#15AABF', 'cyan'],
    ['#12B886', 'teal'],
    ['#40C057', 'green'],
    ['#82C91E', 'lime'],
    ['#FAB005', 'yellow'],
    ['#FD7E14', 'orange']
]);

const nameToHex = new Map<string, string>(
    Array.from(hexToName.entries()).map(([key, value]) => [value, key])
);

export interface ThemeColor {
    name: string,
    hex: string,
}

export const ThemeColors = {
    getByName: (name: string) => nameToHex.get(name),
    getByHex: (hex: string) => hexToName.get(hex),
    getAll: (): ThemeColor[] => {
        return Array.from(nameToHex.entries()).map(([key, value]) => ({name: key, hex: value}));
    }
}