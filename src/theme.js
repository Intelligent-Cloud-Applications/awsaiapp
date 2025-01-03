import chroma from 'chroma-js';

const theme = (baseColor) => {
    const primary = chroma(baseColor);

    // Define secondary color (black)
    const secondary = primary.darken(3);
    return {
        primary: primary.hex(),
        secondary: secondary.hex(),
        accent: chroma(baseColor).brighten(1).hex(), // Light primary
        background: chroma(baseColor).brighten(3).hex(), // Lightest primary    
    };
};

export default theme;
