import 'expo-dev-client';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notix from 'notix-rn';
import axios from 'axios';

import Header from './components/Header';
import CoinDisplay from './components/CoinDisplay';
import DonateButton from './components/DonateButton';
import { APP_CONFIG } from './config';

export default function App() {
  const [coins, setCoins] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  let interstitialLoader;

  // Função para verificar atualizações
  const checkForUpdates = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/alldevs/apps-cda/main/config.json');
      const remoteVersion = response.data['salve-anjos'].version;

      if (APP_CONFIG.version !== remoteVersion) {
        Alert.alert(
          'Atualização disponível',
          'Uma nova versão do app está disponível. Por favor, atualize para a versão mais recente.',
          [
            {
              text: 'Atualizar',
              onPress: () => Linking.openURL('https://apps-cda.all.dev.br/salve-anjos.html'),
            },
          ]
        );
      }
    } catch (error) {
      console.error('Erro ao verificar atualização:', error);
    }
  };

  useEffect(() => {
    checkForUpdates();

    Notix.Notification.init('10061ed93651b9d5748c49085b78145', '79b0feed0f864237bc3baa1c1cc1dcb5');
  }, []);

  // Função para exibir anúncio intersticial
  const showInterstitialAd = async () => {
    try {
      interstitialLoader = await Notix.Interstitial.createLoader(6417824);
      interstitialLoader.startLoading();

      const interstitialData = await interstitialLoader.next(5000);
      Notix.Interstitial.show(interstitialData);
    } catch (error) {
      console.error('Erro ao carregar o anúncio:', error);
    }
  };

  // Lógica do timer para reativar o botão
  useEffect(() => {
    if (isButtonDisabled) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 10));
      }, 1000);

      if (timer === 0) {
        setIsButtonDisabled(false);
        setTimer(10);
      }

      return () => clearInterval(interval);
    }
  }, [timer, isButtonDisabled]);

  // Função chamada ao clicar no botão
  const handleClick = async () => {
    setCoins(coins + 1);
    setIsButtonDisabled(true);
    await showInterstitialAd();
  };

  // Função para partilhar o app
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Salve Anjos - Ajude a arrecadar fundos para a Casa dos Anjos! Baixe o app e contribua todos os dias: https://apps-cda.all.dev.br/salve-anjos.html',
      });
      if (result.action === Share.sharedAction && result.activityType) {
        console.log('Compartilhado com atividade:', result.activityType);
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <CoinDisplay coins={coins} />

      <Text style={styles.infoText}>
        A cada 1000 moedas, você estará ajudando com aproximadamente 1 dólar para salvar vidas de animais.
        Contribua todos os dias e faça a diferença!
      </Text>

      <DonateButton
        isButtonDisabled={isButtonDisabled}
        timer={timer}
        onClick={handleClick}
      />

      <Text style={styles.supportText}>
        A cada clique, você ajuda a Casa Dos Anjos a continuar salvando vidas de animais. Cada gesto conta!
      </Text>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Compartilhe este app</Text>
      </TouchableOpacity>

      <Text style={styles.supportText}>
        Clicar no anúncio pode render mais moedas para doação. Compartilhe o app para ajudar ainda mais!
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  supportText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    color: '#555',
  },
  shareButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
