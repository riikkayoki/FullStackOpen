import { Pressable, Text } from 'react-native';
import styled from 'styled-components/native';
import theme from '../theme';

const StyledPressable = styled(Pressable)`
  padding-horizontal: ${theme.spacing.md}px;
  padding-vertical: ${theme.spacing.md}px;
`;

const TabText = styled(Text)`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.subheading}px;
  font-weight: ${theme.fontWeights.bold};
`;

const AppBarTab = ({ title, onPress }) => {
  return (
    <StyledPressable onPress={onPress}>
      <TabText>{title}</TabText>
    </StyledPressable>
  );
};

export default AppBarTab;
