import { Box, HStack, IconButton, Icon, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import {StyleSheet} from 'react-native';

function ContactItem ({ title, handlePress }) {
  return (
    <Box w="80%" style={styles.container}>
      <HStack>
        <Text style={styles.text}>{title}</Text>
        <IconButton onPress={handlePress} icon={<Icon as={MaterialIcons} name="phone" size="sm" color="black"/>} />
        <IconButton icon={<Icon as={MaterialIcons} name="favorite-border" size="sm" color="black"/>} />
      </HStack>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    backgroundColor: 'violet',
    width: 350,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
  }
});

export default ContactItem;