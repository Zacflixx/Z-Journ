import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';

import ProgressiveImage from './ProgressiveImage';

import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';
import ViewScreen from '../screens/ViewScreen';

const PostCard = ({navigation, item, onBack, onView, onPress}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card
      key={item.id}
      style={{
        backgroundColor: '#191919',
        borderWidth: 4,
        borderColor: '#d4b057',
      }}>
      <UserInfo>
        <UserImg
          style={{width: '45%', height: 60}}
          source={{
            uri: userData
              ? item.postImg ||
                'https://png.pngitem.com/pimgs/s/168-1689599_male-user-filled-icon-user-icon-100-x.png'
              : 'https://png.pngitem.com/pimgs/s/168-1689599_male-user-filled-icon-user-icon-100-x.png',
          }}
        />
        <UserInfoText style={{color: 'black'}}>
          <TouchableOpacity onPress={onPress}>
            <UserName style={{color: 'black'}}>
              {userData ? userData.fname || 'Z-Journal' : 'Z-Journal'}{' '}
              {userData ? userData.lname || 'User' : 'User'}
            </UserName>
          </TouchableOpacity>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText style={{color: '#d4b057'}}>{item.post}</PostText>
      {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
      {item.postImg != null ? (
        <ProgressiveImage
          defaultImageSource={require('../assets/default-img.jpg')}
          source={{uri: item.postImg}}
          style={{width: '100%', height: 60}}
          resizeMode="contain"
        />
      ) : (
        <Divider />
      )}

      <InteractionWrapper>
        {/* <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction> */}
        {/* <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction> */}
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} color="#d4b057" />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
