import styled from 'styled-components/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native';
const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  tertiary: '#1f2937',
  darkLight: '#9ca3af',
  brand: '#6d28d9',
  green: '#10b981',
  red: '#ef4444',
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled(View)`
  flex: 0.1;
  padding: 10px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${secondary};
`;

export const InnerContainer = styled(View)`
  align-items: center;
  padding: 10px;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;
export const WelcomeContainer = styled(InnerContainer)`
  padding: 10px;
  padding-top: 10px;
  justify-content: bottom;
`;
export const PageLogo = styled(Image)`
  width: 270px;
  height: 80px;
  justify-content: center;
`;
export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;
export const WelcomeImage = styled.Image`
  height: 50%;
  min-width: 100px;
`;
export const PageTitle = styled(Text)`
  height: 70%;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${brand};
  ${(props) =>
    props.welcome &&
    `
  font-size:35px;`}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  text-align: center;
  height: 78%;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
  margin-bottom: 30px;
  ${(props) =>
    props.welcome &&
    `
  margin-bottom:5px;
  font-weight:normal;`}
`;

export const StyledFormArea = styled(View)`
  font-size: 18px;
  text-align: center;
  letter-spacing: 1px;
  font-weight: bold;
  padding: 0.1px;
  background-color: ${secondary};
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 10px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 1px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled(Text)`
  color: ${tertiary};
  font-size: 14px;
  text-align: left;
`;

export const LeftIcon = styled(View)`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled(TouchableOpacity)`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.View`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
  align-items: center;
  ${(props) =>
    props.google == true &&
    `
  background-color:${green};
  flex-direction:row;
  justify-content:center;
  `}
`;

export const ButtonText = styled(Text)`
  color: ${primary}; /* Set the text color to the primary color */
  font-size: 16px; /* Set the font size to 16 pixels */

  ${(props) =>
    props.google == true &&
    `
      padding: 4px; /* Add 4 pixels of padding if the 'google' prop is true */
    `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
`;
export const Line = styled.Text`
  width: 100%;
  background-color: ${brand};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
export const ExtraText = styled.Text`
  height: 100px;
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
  height: 100px;
`;
