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
    warning: '#f8d7da',
    success: '#d4edda',
    white: '#ffffff',
    hover: '#e9ecef',
};

const text = {
    primary: '#bc70dc',
    default: '#696969',
    second: 'grey',
    disabled: '#b2adb0',
    label: '#adadad',
    warning: '#ff0000',
    white: '#ffffff',
    black: '#000000',
    grey: 'rgb(108, 117, 125)',
    breadcrumb: '#adb5bd',
};

const theme = {
    color,
    bg,
    text,
};

export default theme;
