import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type DonateButtonProps = {
    isButtonDisabled: boolean;
    timer: number;
    onClick: () => void;
    };
export default function DonateButton({ isButtonDisabled, timer, onClick }: DonateButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
      onPress={onClick}
      disabled={isButtonDisabled}
    >
      <Text style={styles.buttonText}>
        {isButtonDisabled ? `Aguarde ${timer}s para doar novamente` : 'Clique para doar'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
  },
  buttonEnabled: {
    backgroundColor: 'green',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
