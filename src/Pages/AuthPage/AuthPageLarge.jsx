import { Button, Flex, Input, Link, Text, VStack } from '@chakra-ui/react';

const AuthPageLarge = () => {
  return (
    <VStack
      px={10}
      py={12}
      borderRadius={3}
      bgColor={'gray.300'}
      position={'absolute'}
      right={0}
      mr={'15em'}
      top={'50%'}
      transform={' translateY(-50%)'}>
      <Text fontSize={'2em'} fontFamily={'serif'} mb={3}>
        Create New Account
      </Text>
      <VStack minW={'300px'}>
        <Input variant={'flushed'} size={'lg'} placeholder='Name' />
        <Input variant={'flushed'} size={'lg'} placeholder='Email' />{' '}
        <Input variant={'flushed'} size={'lg'} placeholder='Password' />
        <Button w={'100%'} mt={5} size={'lg'} colorScheme='blue'>
          Sign Up
        </Button>
        <Flex gap={2}>
          Already have an account? <Link>Log in</Link>
        </Flex>
      </VStack>
    </VStack>
  );
};
export default AuthPageLarge;
