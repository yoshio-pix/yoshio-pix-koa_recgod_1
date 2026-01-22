/* eslint-disable react-hooks/exhaustive-deps */
/**-------------------------------------------
 * 画面遷移
 * navigation/AppNavigator.tsx
 * ---------------------------------------------*/

//##########################################################
//変更箇所「App.tsx、AppNavigator.tsx」
let kyoten = '受付'; //本部・本社・岡セラ・大ヶ池
let systemmode = '1'; //黄色…N 赤色…1 青色…K
let addUrl = '';
// let kyoten = '本部'; //本部・本社・岡セラ・大ヶ池
// let systemmode = 'K'; //黄色…N 赤色…1 青色…K
// let addUrl = '';
// let kyoten = '本社'; //本部・本社・岡セラ・大ヶ池
// let systemmode = 'N'; //黄色…N 赤色…1 青色…K
// let addUrl = '_1';
// let kyoten = '岡セラ'; //本部・本社・岡セラ・大ヶ池
// let systemmode = 'N'; //黄色…N 赤色…1 青色…K
// let addUrl = '_2';
// let kyoten = '大ヶ池'; //本部・本社・岡セラ・大ヶ池
// let systemmode = 'N'; //黄色…N 赤色…1 青色…K
// let addUrl = '_3';
// let webSocketUrl =
// 'wss://wpupisoyha.execute-api.ap-northeast-1.amazonaws.com/stage/'; //本部
// 'wss://18fmbp6c9c.execute-api.ap-northeast-1.amazonaws.com/stage/'; //本社
// 'wss://8d50xq3gr0.execute-api.ap-northeast-1.amazonaws.com/stage/'; //岡セラ
// 'wss://v0byz9bbkb.execute-api.ap-northeast-1.amazonaws.com/stage/'; //大ヶ池
// 'wss://fa4oqj7k64.execute-api.ap-northeast-1.amazonaws.com/stage/'; //運輸
//##########################################################

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import RVW001 from '../screens/RVW001';
import RVW002 from '../screens/RVW002';
import RVW003 from '../screens/RVW003';
import RVW004 from '../screens/RVW004';
// import LVW001 from '../screens/LVW001';
// import LVW002 from '../screens/LVW002';
import {AlertProvider} from '../components/AlertContext';
// import {objState, driverState, carState, antenaState} from '../atom/atom.tsx';
// import {useSetRecoilState} from 'recoil';
import {modeState, kyotenState, addUrlState} from '../atom/atom.tsx';
// import {Alert, BackHandler} from 'react-native';
export type RootList = {
  RVW001: undefined;
  RVW002: undefined;
  RVW003: undefined;
  RVW004: undefined;
  LVW001: undefined;
  LVW002: undefined;
};
const Stack = createStackNavigator<RootList>();
//端末チェック処理
import DeviceInfo from 'react-native-device-info';
import {useSetRecoilState} from 'recoil';
const allowedDeviceIds = [
  '70660eb08b1f2de3', //エミュレータ
  'd0aa51061feae449', //1号機（親機）
  '3840515639ad82c6', //2号機
  '47936ae0a9d77371', //3号機
  '5f33cb8e25f28d5d', //追加分
  '32a7cd51def4da0c', //追加分
  '938aac290e42f3d1', //追加分
  'b85a85b1d25c8db9', //20240912追加分
]; // 許可されたデバイスIDのリスト
console.log(DeviceInfo.getUniqueId());
DeviceInfo.getUniqueId().then(uniqueId => {
  console.log('★', uniqueId);
  // if (!allowedDeviceIds.includes(uniqueId)) {
  //   // アラートを表示してアプリを閉じる処理
  //   Alert.alert(
  //     'エラー',
  //     'このデバイスではこのアプリを使用できません。',
  //     [{text: 'OK', onPress: () => BackHandler.exitApp()}],
  //     {cancelable: false},
  //   );
  // }
});

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootList>();
  const setMode = useSetRecoilState(modeState); //Recoil
  const setKyoten = useSetRecoilState(kyotenState); //Recoil
  // const setObj = useSetRecoilState(objState); //Recoil id
  // const setDriver = useSetRecoilState(driverState); //Recoil 運転手
  // const setCar = useSetRecoilState(carState); //Recoil 車
  // const setNum = useSetRecoilState(numState); //Recoil ユニークID
  const setAddUrl = useSetRecoilState(addUrlState); //Recoil
  // const setAntena = useSetRecoilState(antenaState); //Recoil 車
  useEffect(() => {
    setMode(systemmode);
    setKyoten(kyoten);
    setAddUrl(addUrl);
  }, []); // 依存配列は空です（コンポーネントのマウント時に1回だけ実行）

  // useEffect(() => {
  //   // WebSocket 接続を開く
  //   function connectWebSocket() {
  //     const ws = new WebSocket(
  //       'wss://9s9p5r6sh9.execute-api.ap-southeast-2.amazonaws.com/stage/',
  //     );

  //     ws.onopen = () => {
  //       console.log('connected');
  //       // Alert.alert('接続完了');
  //     };

  //     ws.onmessage = (e: any) => {
  //       let obj = JSON.parse(e.data);
  //       console.log('response', e.data);
  //       if (obj.re === '0') {
  //         //受付時の処理
  //         setDriver(obj.driver);
  //         setCar(obj.car);
  //         setObj(obj);
  //       } else {
  //         //一覧更新時の再描画用
  //         const now = new Date(); // 現在の日時を取得
  //         const antenaData = String(now.getTime());
  //         setAntena(antenaData);
  //       }
  //     };

  //     ws.onerror = (e: any) => {
  //       console.error('error', e.message);
  //     };

  //     ws.onclose = (e: any) => {
  //       console.log('disconnect', e.reason);
  //       // 短時間に再接続が多発しないようにするための遅延
  //       setTimeout(() => {
  //         connectWebSocket();
  //       }, 1000); // 1秒後に再接続
  //     };

  //     return ws;
  //   }

  //   const wsInstance = connectWebSocket();

  //   return () => {
  //     wsInstance.close();
  //   };
  // }, []); // 依存配列は空です（コンポーネントのマウント時に1回だけ実行）

  useEffect(() => {
    // アプリ起動時の処理
    const initialize = async () => {
      setInitialRoute('RVW001');
      // setInitialRoute('LVW001');
    };

    initialize();
  }, []);

  return (
    <NavigationContainer>
      <AlertProvider>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={initialRoute}>
          <Stack.Screen name="RVW001" component={RVW001} />
          <Stack.Screen name="RVW002" component={RVW002} />
          <Stack.Screen name="RVW003" component={RVW003} />
          <Stack.Screen name="RVW004" component={RVW004} />
          {/* <Stack.Screen name="LVW001" component={LVW001} />
          <Stack.Screen name="LVW002" component={LVW002} /> */}
        </Stack.Navigator>
      </AlertProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
