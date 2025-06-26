import { Text as NativeText } from 'react-native';
import styled from 'styled-components/native';
import theme from '../theme';

const StyledText = styled(NativeText)`
    color: ${(props) =>
        props.color === 'textSecondary'
            ? theme.colors.textSecondary
            : props.color === 'primary'
              ? theme.colors.primary
              : theme.colors.textPrimary};
    font-size: ${(props) =>
        props.fontSize === 'subheading' ? theme.fontSizes.subheading : theme.fontSizes.body}px;
    font-family: ${theme.fonts.main};
    font-weight: ${(props) =>
        props.fontWeight === 'bold' ? theme.fontWeights.bold : theme.fontWeights.normal};
`;

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
    return (
        <StyledText
            color={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
            style={style}
            {...props}
        />
    );
};

export default Text;
