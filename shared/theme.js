const color = {
    neonPink: '#ff6ec4',
    purple: '#7873f5',
    white: '#ffffff',
    lightGrey: '#d3d3d3',
};

const bg = {
    default: '#f0f0f0',
    horizontalGradient: `linear-gradient(90deg, ${color.neonPink}, ${color.purple})`,
    doubleHorizontalGradient: `linear-gradient(90deg, ${color.purple} 0%, ${color.neonPink} 50%, ${color.purple} 100%)`,
    success: '#d4edda',
    white: '#ffffff',
    hover: '#e9ecef',
    searchBorder: '#dee2e6',
};

const text = {
    primary: '#bc70dc',
    default: '#696969',
    second: 'grey',
    disabled: '#b2adb0',
    label: '#adadad',
    white: '#ffffff',
    black: '#000000',
    grey: 'rgb(108, 117, 125)',
    breadcrumb: '#adb5bd',
    darkgrey: 'darkgrey',
    lightgrey: 'lightgrey',
    tooltip: '#555',
};

const theme = {
    color,
    bg,
    text,
    warning: {
        default: '#f15e61',
        light: '#f8d7da',
    },
    success: {
        default: '#63bf78',
        light: '#d4edda',
    },
};

export default theme;
