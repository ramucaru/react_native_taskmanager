import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { BackHandler, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export const unstable_settings = {
  // Used for `(foo)`
  initialRouteName: 'login',
};

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => backHandler.remove();
  }, [])
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: 'Task',
          tabBarIcon: ({ color }) => <TabBarIcon name="creative-commons" color={color} />,
        }}
      />
      <Tabs.Screen
        name="task-details"
        options={{
          title: 'Task Details',
          tabBarIcon: ({ color }) => <TabBarIcon name="deviantart" color={color} />,
  
        }}
      />
    </Tabs>
  );
}
