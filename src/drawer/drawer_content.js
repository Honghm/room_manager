import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import{ AuthContext } from '../component/context';


function CustomDrawerContent(props) {
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Minh Hồng</Title>
                                <Caption style={styles.caption}>@minhhong0001</Caption>
                            </View>
                        </View>
                    </View>
                <Drawer.Section style={styles.drawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="home-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Trang chủ"
                    onPress={() => {props.navigation.navigate('Drawer')}}
                />
                <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="account-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Trang cá nhân"
                        onPress={() => {props.navigation.navigate('Screen 1')}}
                    />
                <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="bookmark-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Nhóm của bạn"
                        onPress={() => {}}
                    />
                 <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="account-check-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Trợ giúp"
                        onPress={() => {}}
                    />
            </Drawer.Section>
            <Drawer.Section title="Giao diện">
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.preference}>
                            <Text>Màu tối</Text>
                            <View pointerEvents="none">
                                <Switch value={0}/>
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem 
                icon={({color, size}) => (
                    <Icon 
                    name="exit-to-app" 
                    color={color}
                    size={size}
                    />
                )}
                label="Đăng Xuất"
                onPress={() => {props.navigation.navigate('LoginPage')}}
            />
        </Drawer.Section>
      
        </View>
     
    );
  }
  
// function DrawerContent(props) {
//     return(
//         <View style={{flex:1}}>
//         <DrawerContentScrollView {...props}>
//             <View style={styles.drawerContent}>
//                 <View style={styles.userInfoSection}>
//                     <View style={{flexDirection:'row',marginTop: 15}}>
//                         <Avatar.Image 
//                             source={{
//                                 uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
//                             }}
//                             size={50}
//                         />
//                         <View style={{marginLeft:15, flexDirection:'column'}}>
//                             <Title style={styles.title}>John Doe</Title>
//                             <Caption style={styles.caption}>@j_doe</Caption>
//                         </View>
//                     </View>

//                     <View style={styles.row}>
//                         <View style={styles.section}>
//                             <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
//                             <Caption style={styles.caption}>Following</Caption>
//                         </View>
//                         <View style={styles.section}>
//                             <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
//                             <Caption style={styles.caption}>Followers</Caption>
//                         </View>
//                     </View>
//                 </View>

//                 <Drawer.Section style={styles.drawerSection}>
//                     <DrawerItem 
//                         icon={({color, size}) => (
//                             <Icon 
//                             name="home-outline" 
//                             color={color}
//                             size={size}
//                             />
//                         )}
//                         label="Home"
//                         onPress={() => {}}
//                     />
//                     <DrawerItem 
//                         icon={({color, size}) => (
//                             <Icon 
//                             name="account-outline" 
//                             color={color}
//                             size={size}
//                             />
//                         )}
//                         label="Profile"
//                         onPress={() => {}}
//                     />
//                     <DrawerItem 
//                         icon={({color, size}) => (
//                             <Icon 
//                             name="bookmark-outline" 
//                             color={color}
//                             size={size}
//                             />
//                         )}
//                         label="Bookmarks"
//                         onPress={() => {}}
//                     />
//                     <DrawerItem 
//                         icon={({color, size}) => (
//                             <Icon 
//                             name="settings-outline" 
//                             color={color}
//                             size={size}
//                             />
//                         )}
//                         label="Settings"
//                         onPress={() => {}}
//                     />
//                     <DrawerItem 
//                         icon={({color, size}) => (
//                             <Icon 
//                             name="account-check-outline" 
//                             color={color}
//                             size={size}
//                             />
//                         )}
//                         label="Support"
//                         onPress={() => {}}
//                     />
//                 </Drawer.Section>
//                 <Drawer.Section title="Preferences">
//                     <TouchableRipple onPress={() => {}}>
//                         <View style={styles.preference}>
//                             <Text>Dark Theme</Text>
//                             <View pointerEvents="none">
//                                 <Switch value={paperTheme.dark}/>
//                             </View>
//                         </View>
//                     </TouchableRipple>
//                 </Drawer.Section>
//             </View>
//         </DrawerContentScrollView>
//         <Drawer.Section style={styles.bottomDrawerSection}>
//             <DrawerItem 
//                 icon={({color, size}) => (
//                     <Icon 
//                     name="exit-to-app" 
//                     color={color}
//                     size={size}
//                     />
//                 )}
//                 label="Sign Out"
//                 onPress={() => {}}
//             />
//         </Drawer.Section>
//     </View>
    
//     )
// }
 
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      fontFamily: 'Segoe UI', 
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily: 'Segoe UI', 
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
      fontFamily: 'Segoe UI', 
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  export default CustomDrawerContent;