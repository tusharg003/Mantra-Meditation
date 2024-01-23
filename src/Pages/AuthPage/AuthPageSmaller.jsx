import { Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AuthPageSmaller = () => {
  return (
    <VStack
      w={'300px'}
      h={'fit-content'}
      borderRadius={3}
      p={2}
      py={8}
      bgColor={'gray.300'}
      mx={'auto'}>
      <Text fontSize={'1.3em'} fontFamily={'serif'}>
        Create New Account
      </Text>
      <VStack w={'90%'}>
        <Input variant={'flushed'} size={'sm'} placeholder='Name' />
        <Input variant={'flushed'} size={'sm'} placeholder='Email' />{' '}
        <Input variant={'flushed'} size={'sm'} placeholder='Password' />
        <Button w={'100%'} mt={5} size={'sm'} colorScheme='blue'>
          Sign Up
        </Button>
        <Flex gap={2} fontSize={'sm'}>
          Already have an account? <Link>Log in</Link>
        </Flex>
      </VStack>
    </VStack>
  );
};
export default AuthPageSmaller;
