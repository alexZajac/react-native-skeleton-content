jest.mock("react-native-reanimated", () => 
    jest.requireActual("./node_modules/react-native-reanimated/mock"),
);
jest.mock('react-native-gesture-handler', () => {});