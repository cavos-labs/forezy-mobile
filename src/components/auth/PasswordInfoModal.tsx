import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Modal,
  StyleSheet
} from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

interface PasswordInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PasswordInfoModal({ visible, onClose }: PasswordInfoModalProps) {
  // Animation for close button
  const scale = useSharedValue(1);
  
  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Password Requirements
                </Text>
                <Animated.View style={animatedStyle}>
                  <TouchableOpacity 
                    onPress={onClose}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={styles.closeButton}
                  >
                    <X size={20} color={Colors.textPrimary} />
                  </TouchableOpacity>
                </Animated.View>
              </View>
              <View style={styles.modalBody}>
                <Text style={styles.requirementText}>
                  • At least 8 characters
                </Text>
                <Text style={styles.requirementText}>
                  • At least one uppercase letter (A-Z)
                </Text>
                <Text style={styles.requirementText}>
                  • At least one lowercase letter (a-z)
                </Text>
                <Text style={styles.requirementText}>
                  • At least one number (0-9)
                </Text>
                <Text style={styles.requirementText}>
                  • At least one special character (!@#$%^&*)
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    paddingVertical: 10,
  },
  requirementText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: Fonts.regular,
    marginBottom: 10,
  },
}); 