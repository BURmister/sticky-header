import { useEffect, useRef, useState } from 'react';
import { Image, Animated, Text, View, Dimensions, StyleSheet, StatusBar, TextInput } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

import { AntDesign } from '@expo/vector-icons';
const { height, width } = Dimensions.get('screen');

const articleParagraphs = [
   'One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy. ',
   'Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least. ',
   'Another journey chamber way yet females man. Way extensive and dejection get delivered deficient sincerity gentleman age. Too end instrument possession contrasted motionless. Calling offence six joy feeling. Coming merits and was talent enough far. Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard. ',
   'Village did removed enjoyed explain nor ham saw calling talking. Securing as informed declared or margaret. Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured country believe. On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common. My little garret repair to desire he esteem. ',
   'In it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. ',
   'Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom gay nor design age. Am weather to entered norland no in showing service. Nor repeated speaking shy appetite. Excited it hastily an pasture it observe. Snug hand how dare here too. ',
   'Improve ashamed married expense bed her comfort pursuit mrs. Four time took ye your as fail lady. Up greatest am exertion or marianne. Shy occasional terminated insensible and inhabiting gay. So know do fond to half on. Now who promise was justice new winding. In finished on he speaking suitable advanced if. Boy happiness sportsmen say prevailed offending concealed nor was provision. Provided so as doubtful on striking required. Waiting we to compass assured. ',
];

const getImage = (i) => `https://source.unsplash.com/600x${400 + i}/?blackandwhite`;

export default () => {
   NavigationBar.setBackgroundColorAsync('white');
   NavigationBar.setButtonStyleAsync('dark');

   const [header, setHeader] = useState(null);
   const scrollY = useRef(new Animated.Value(0)).current;

   const topEdge = header?.y;
   const inputRange = [-1, 0, 1, 2, topEdge - 1, topEdge, topEdge + 1];

   // useEffect(() => {
   //    console.log(header);
   // }, [topEdge]);

   return (
      <View>
         <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
         <Animated.ScrollView
            contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 16 }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
               useNativeDriver: true,
            })}>
            <Text style={styles.heading}>Black & White</Text>
            <Image style={styles.image} source={{ uri: getImage(3) }} />

            <View style={[styles.header, { marginBottom: 16 }]} onLayout={(event) => setHeader(event.nativeEvent.layout)} />

            {articleParagraphs.map((text, index) => {
               return (
                  <View key={index}>
                     {index % 3 === 0 && <Image style={styles.image} source={{ uri: getImage(index) }} />}
                     <Text style={styles.paragraph}>{text}</Text>
                  </View>
               );
            })}
            <View>
               <Text style={styles.featuredTitle}>Featured</Text>
               {articleParagraphs.slice(0, 3).map((text, index) => {
                  return (
                     <View key={`featured-${index}`} style={{ marginBottom: 20, flexDirection: 'row' }}>
                        <Image style={styles.featuredImage} source={{ uri: getImage(index) }} />
                        <Text numberOfLines={3} style={styles.paragraph}>
                           {text}
                        </Text>
                     </View>
                  );
               })}
            </View>
         </Animated.ScrollView>
         {header && (
            <Animated.View
               style={[
                  styles.header,
                  {
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     paddingHorizontal: 8,
                     zIndex: 13,
                     // backgroundColor: 'rgba(255, 255, 255, 1)',
                     transform: [
                        {
                           translateY: scrollY.interpolate({
                              inputRange,
                              outputRange: [header.y, header.y, header.y - 1, header.y - 2, 1, 0, 0],
                           }),
                        },
                     ],
                  },
               ]}>
               <View style={{ position: 'relative' }}>
                  <TextInput
                     style={{
                        paddingRight: 38,
                        paddingLeft: 8,
                        width: '100%',
                        height: 44,
                        backgroundColor: '#fff',
                        color: '#000',
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: '#000',
                     }}
                     placeholder="Search awesome stuff"
                     cursorColor="#000"
                  />
                  <View style={{ position: 'absolute', top: 0, right: 8, height: '100%', display: 'flex', justifyContent: 'center' }}>
                     <AntDesign name="search1" size={24} color="black" />
                  </View>
               </View>
            </Animated.View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   featuredImage: {
      width: 50,
      height: 50,
      resizeMode: 'cover',
      marginRight: 20,
      borderRadius: 10,
   },
   header: {
      height: 64,
      justifyContent: 'center',
      backgroundColor: '#fff',
   },
   image: { width: '100%', height: height * 0.4, resizeMode: 'cover', marginBottom: 16 },
   featuredTitle: {
      fontSize: 24,
      fontWeight: '800',
      marginVertical: 20,
   },
   heading: {
      marginTop: 20,
      fontSize: 32,
      fontWeight: '800',
      marginBottom: 30,
   },
   paragraph: {
      flex: 1,
      marginBottom: 10,
      // fontFamily: 'Georgia'
      fontSize: 14,
      lineHeight: 16 * 1.5,
   },
   icon: {
      height: 60,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
   },
});
