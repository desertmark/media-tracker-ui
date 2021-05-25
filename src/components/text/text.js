import { Box, useTheme } from "@material-ui/core";

export default function Text({ children, size, weight, color }) {
    const theme = useTheme();
    const fontSize = theme.typography[size]?.fontSize;
    return (
        <Box fontSize={fontSize} fontWeight={weight} color={color}>
            {children}
        </Box>
    );
}