import React from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

/***************** Component imports ****************/
import { FoodStack, EcomStack, TableStack, OrdersStack, ProfileStack, NotificationStack } from './stackNavigation';


export const FoodTabs = TabNavigator({
  FoodTab: {
    screen: FoodStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => <Icon name="ios-home-outline" size={24} color={tintColor} />,
    },
  },
  Orders: {
    screen: OrdersStack,
    navigationOptions: {
      tabBarLabel: 'Orders',
      tabBarIcon: ({tintColor}) => <Icon name="ios-cart-outline" size={24} color={tintColor} />,
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => <Icon name="ios-contact-outline" size={24} color={tintColor} />,
    },
  },
  Notificaton: {
    screen: NotificationStack,
    navigationOptions: {
      tabBarLabel: 'Notification',
      tabBarIcon: ({tintColor}) => <Icon name="ios-notifications-outline" size={24} color={tintColor} />
    },
  },
}, {
  initialRouteName: 'FoodTab',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#4DD1A5',
    inactiveTintColor: '#AAADAC',
    upperCaseLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#ffffff',
      margin: 0,
      padding: 0,
    },
    labelStyle: {
      fontSize: 12,
      margin: 0,
      padding: 0,
    },
    indicatorStyle: {
      opacity: 0,
    },
  }
});

export const TableTabs = TabNavigator({
  TableTab: {
    screen: TableStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => <Icon name="ios-home-outline" size={24} color={tintColor} />,
    },
  },
  Orders: {
    screen: OrdersStack,
    navigationOptions: {
      tabBarLabel: 'Orders',
      tabBarIcon: ({tintColor}) => <Icon name="ios-cart-outline" size={24} color={tintColor} />,
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => <Icon name="ios-contact-outline" size={24} color={tintColor} />,
    },
  },
  Notificaton: {
    screen: NotificationStack,
    navigationOptions: {
      tabBarLabel: 'Notification',
      tabBarIcon: ({tintColor}) => <Icon name="ios-notifications-outline" size={24} color={tintColor} />
    },
  },
}, {
  initialRouteName: 'TableTab',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#4DD1A5',
    inactiveTintColor: '#AAADAC',
    upperCaseLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#ffffff',
    },
    labelStyle: {
      fontSize: 10,
      margin: 0
    },
    indicatorStyle: {
      opacity: 0,
    }
  }
});

export const EcomTabs = TabNavigator({
  EcomTab: {
    screen: EcomStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => <Icon name="ios-home-outline" size={24} color={tintColor} />,
    },
  },
  Orders: {
    screen: OrdersStack,
    navigationOptions: {
      tabBarLabel: 'Orders',
      tabBarIcon: ({tintColor}) => <Icon name="ios-cart-outline" size={24} color={tintColor} />,
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => <Icon name="ios-contact-outline" size={24} color={tintColor} />,
    },
  },
  Notificaton: {
    screen: NotificationStack,
    navigationOptions: {
      tabBarLabel: 'Notification',
      tabBarIcon: ({tintColor}) => <Icon name="ios-notifications-outline" size={24} color={tintColor} />
    },
  },
}, {
  initialRouteName: 'EcomTab',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#4DD1A5',
    inactiveTintColor: '#AAADAC',
    upperCaseLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#ffffff',
    },
    labelStyle: {
      fontSize: 10,
      margin: 0
    },
    indicatorStyle: {
      opacity: 0,
    }
  }
});
