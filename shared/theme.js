const color = {
    neonPink: '#ff6ec4',
    purple: '#7873f5',
};

const theme = {
    color,
    bg: {
        default: '#f0f0f0',
        horizontalGradient: `linear-gradient(90deg, ${color.neonPink}, ${color.purple})`,
        doubleHorizontalGradient: `linear-gradient(90deg, ${color.purple} 0%, ${color.neonPink} 50%, ${color.purple} 100%)`,
        light: '#d3d3d3',
        white: '#ffffff',
        hover: '#e9ecef',
    },
    text: {
        main: '#bc70dc',
        primary: '#24292e',
        alt: '#6c757d',
        light: '#a9a9a9',
        disabled: '#b2adb0',
        white: '#ffffff',
    },
    border: {
        default: '#dee2e6',
    },
    warning: {
        default: '#f15e61',
        light: '#f8d7da',
    },
    success: {
        default: '#63bf78',
        light: '#d4edda',
    },
    tooltip: '#555555',
};

export default theme;
