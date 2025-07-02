import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
}); 