import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Header } from '@/src/components/Header';
import Colors from '@/src/constants/Colors';
import { Fonts } from '@/src/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/contexts/AuthContext';
import AnimatedButton from '@/src/components/ui/AnimatedButton';

export default function ProfileScreen() {
  const [showModal, setShowModal] = useState(false);
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Profile"
        icon={require('@/src/assets/images/profile.png')}
      />

      {/* Avatar */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{user?.email?.[0].toUpperCase() || '?'}</Text>
        </View>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.infoSection}>        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Wallet Address</Text>
          <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="middle">
            {user?.address}
          </Text>
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionsColumn}>
        <AnimatedButton
          title="Logout"
          onPress={handleLogout}
          isLoading={isLoading}
          disabled={isLoading}
        />

        <TouchableOpacity style={styles.deleteAccount} onPress={() => setShowModal(true)}>
          <Ionicons name="trash-outline" size={16} color={Colors.red} style={{ marginRight: 6 }} />
          <Text style={styles.deleteText}>Eliminar Cuenta</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>¿Estás seguro de eliminar tu cuenta?</Text>
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Sí, eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarText: {
    fontSize: 40,
    fontFamily: Fonts.bold,
    color: Colors.background,
  },
  actionsColumn: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  deleteAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  deleteText: {
    color: Colors.red,
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 30,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  modalTitle: {
    color: Colors.textPrimary,
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  confirmButtonText: {
    color: Colors.red,
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  cancelText: {
    color: Colors.grey,
    fontFamily: Fonts.regular,
    fontSize: 14,
  },

  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  email: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    marginTop: 10,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  infoRow: {
    flexDirection: 'column',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 5,
  },

});
