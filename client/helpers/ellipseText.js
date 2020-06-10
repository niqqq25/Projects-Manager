const ellipseText = (text, maxLength) =>
    text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');

export default ellipseText;
