import {CommonActions} from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator && navigator.navigate(routeName, params);
}

function navigateToStack(stack, params) {
  navigator && navigator.dispatch(CommonActions.navigate(stack, params));
}

function resetToStack(stack) {
  navigator &&
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: stack}],
      }),
    );
}

function goBack() {
  navigator && navigator.goBack();
}

export default {
  navigate,
  navigateToStack,
  resetToStack,
  setTopLevelNavigator,
  goBack,
};
